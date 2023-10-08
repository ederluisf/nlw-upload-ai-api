import { FastifyInstance } from "fastify";
import { createReadStream } from 'node:fs';
 import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { openai } from "../lib/openai";


export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post('/videos/:videoId/transcription', async (request) => {
    const paramsSchema = z.object({
      videoId: z.string().uuid(),
    })    
    const { videoId } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
      prompt: z.string(),
    })
    const { prompt } = bodySchema.parse(request.body);

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      }
    });

    const videoPath = video.path;
    // const audioReadStream = createReadStream(videoPath);

    // const response = await openai.audio.transcriptions.create({
    //   file: audioReadStream,
    //   model: 'whisper-1',
    //   language: 'pt',
    //   response_format: 'json',
    //   temperature: 0,
    //   prompt,
    // })

    // const transcription = response.text;

    // Para não ficar utilizando a API real enquanto estamos em desenvolvimento.
    const transcription = 'Estamos vivendo um momento histórico da inteligência artificial, a cada dia vemos novidades envolvendo o IA que impactam diretamente nosso dia a dia e isso nos faz imaginar o que mais vem por aí, qual será a próxima fronteira a ser explorada. A IA generativa, sem dúvida, já se faz presente e está abrindo caminho para o futuro. Para ficar por dentro desse assunto, você tem que acompanhar o NVIDIA GTC 2023, uma das maiores edições com mais de 650 sessões com líderes do mercado de tecnologia. O próprio Jensen Yuan, fundador e CEO da NVIDIA, vai abrir o evento com uma apresentação sobre a IA. O NVIDIA GTC, que acontece de 20 a 23 de março, ainda vai contar com especialistas brasileiros comentando ao vivo diversas sessões. É muito conteúdo e você não pode ficar de fora. Clique no link aqui abaixo para se inscrever gratuitamente e explore todo o cronograma.';

    await prisma.video.update({
      where: {
        id: videoId,
      },
      data : {
        transcription
      }
    })

    return { transcription };
  });
} 