import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateResponse(
    prompt: string,
    model: string,
    callback: (text: string, isLastChunk?: boolean) => void,
  ) {
    try {
      const stream = await this.openai.chat.completions.create({
        model: model || 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        stream: true,
      });
      for await (const chunk of stream) {
        const val = chunk.choices[0]?.delta?.content || '';
        callback(val);
      }
      callback('lastChunk', true);
    } catch (error) {
      console.log({ error });
    }
  }
}
