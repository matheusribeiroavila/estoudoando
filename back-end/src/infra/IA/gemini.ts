import {
  type GenerativeModel,
  GoogleGenerativeAI,
} from '@google/generative-ai';

import { env } from '../../config';
import { logger } from '../../utils';
import { redis } from '../cache';
import { type IAInterface } from './ia.interface';

class Gemini implements IAInterface {
  private readonly gemini: GenerativeModel;

  constructor() {
    this.gemini = new GoogleGenerativeAI(
      env.GEMINI_API_TOKEN,
    ).getGenerativeModel({
      model: 'gemini-pro-vision',
    });
  }

  async getImageClothingItems(imageBuffer: Buffer): Promise<string | null> {
    const cachePrompt = await redis.client.get(
      'gemini:prompt:ImageClothingItems',
    );

    const prompt =
      cachePrompt ||
      'Classifique os itens presente na imagem da forma mais simples possível e retorne somente uma lista numerada (1. ..., 2. ...) somente das peças de roupas e calçados presentes nela. Itens que não são peças de roupas e calçados não devem ser retornados na lista. Não é para classificar/listar os itens por cor, tamanho ou outras características, somente pelo tipo de item. Caso não tenha itens de vestuário, retorne 0.';

    const result = await this.gemini.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBuffer.toString('base64'),
          mimeType: 'image/jpeg',
        },
      },
    ]);

    const clothingItems = result.response.text().trim();

    logger.info({
      msg: 'Análise de imagem realizada pelo Gemini.',
      prompt,
      resultado: clothingItems,
    });

    if (clothingItems === '0') return null;

    return clothingItems;
  }
}

export { Gemini };
