import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '25mb' }));

// Health check route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', hasEnvKey: Boolean(process.env.GEMINI_API_KEY) });
});

// Endpoint for Gemini Nano Banana image editing
app.post('/api/gemini/simulate-finish', async (req, res) => {
  try {
    const { image, mimeType, customApiKey, finishOptions, modelChoice } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Se requiere la imagen del mueble para realizar el lacado.' });
    }

    const apiKey = customApiKey?.trim() || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(401).json({
        error: 'No se ha proporcionado ninguna Clave de API de Google Gemini. Introduce tu API Key de Google en el campo superior o solicítanos orientación por WhatsApp.'
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, '');

    const selectedModel = modelChoice === 'pro' 
      ? 'gemini-nano-banana-2.1' 
      : 'gemini-3.1-flash-lite-image';

    const promptText = `
Eres un maestro lacador artesanal con más de 50 años de tradición en el taller Lacados Arribas Martín (Madrid).
Modifica la imagen adjunta para generar una previsualización fotorrealista del mueble recién lacado y restaurado en nuestro taller.

ESPECIFICACIONES SELECCIONADAS POR EL CLIENTE:
- Elemento a lacar: ${finishOptions?.furnitureType || 'Mueble de madera'}
- Color de Lacado: ${finishOptions?.lacquerColor || 'Blanco Roto Satinado (Arribas Martín)'}
- Nivel de Brillo / Acabado: ${finishOptions?.sheenLevel || 'Satinado Sedoso (15% brillo)'}
- Herrajes / Tiradores: ${finishOptions?.hardware || 'Conservar tiradores originales'}
- Tratamiento previo: ${finishOptions?.repairPrep || 'Lijado, imprimación y acabado artesanal'}
${finishOptions?.additionalNotes ? `- Indicaciones especiales del cliente: ${finishOptions.additionalNotes}` : ''}

INSTRUCCIONES DE EDICIÓN VISUAL (NANO BANANA):
1. MANTÉN ESTRICTAMENTE LA GEOMETRÍA, ESTRUCTURA, MOLDURAS, ILUMINACIÓN Y ENTORNOS DEL MUEBLE ORIGINAL.
2. Reemplaza la textura antigua, madera envejecida o barniz desgastado con un lacado nuevo, liso, suave, sedoso e impecable.
3. Aplica fielmente el tono de color "${finishOptions?.lacquerColor || 'Blanco Roto'}" y el nivel de brillo "${finishOptions?.sheenLevel || 'Satinado Sedoso'}".
4. Si se indicaron nuevos tiradores (${finishOptions?.hardware}), añade los tiradores correspondientes de manera limpia y realista.
5. El resultado final debe ser una fotografía nítida, profesional e inspiradora que muestre la renovación terminada en la estancia.
    `.trim();

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType || 'image/jpeg',
            },
          },
          {
            text: promptText,
          },
        ],
      },
      config: selectedModel === 'gemini-nano-banana-2.1' ? {
        imageConfig: {
          aspectRatio: '1:1',
          imageSize: '1K',
        }
      } : undefined,
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error('No se recibió respuesta válida del servicio de IA.');
    }

    const candidate = response.candidates[0];
    let resultImageUrl = null;
    let textExplanation = '';

    if (candidate.content && candidate.content.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const resMime = part.inlineData.mimeType || 'image/png';
          resultImageUrl = `data:${resMime};base64,${part.inlineData.data}`;
        } else if (part.text) {
          textExplanation += part.text + ' ';
        }
      }
    }

    if (!resultImageUrl) {
      return res.status(500).json({
        error: 'El modelo no retornó la imagen modificada. Nota del modelo: ' + (textExplanation.trim() || 'Sin detalles adicónales.')
      });
    }

    return res.json({
      imageUrl: resultImageUrl,
      notes: textExplanation.trim(),
    });

  } catch (err: any) {
    console.error('Error en simulate-finish endpoint:', err);
    return res.status(500).json({
      error: err?.message || 'Ocurrió un error al procesar la simulación de lacado con IA Nano Banana.',
    });
  }
});

// Vite Middleware for dev or static serving for prod
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve('dist', 'index.html'));
  });
} else {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  app.use(vite.middlewares);
  app.use('*', async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const fs = await import('fs');
      let template = fs.readFileSync(path.resolve('index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
