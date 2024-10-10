import { Module } from '@nestjs/common';
import { ChatBotsService } from './chat-bots.service';
import { ChatBotsController } from './chat-bots.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatBot, ChatBotSchema } from './entities/chat-bots.entity';
import { ChatBotGateway } from './chat-bots.gateway';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  controllers: [ChatBotsController],
  providers: [ChatBotsService, ChatBotGateway],
  imports: [
    MongooseModule.forFeature([{ name: ChatBot.name, schema: ChatBotSchema }]),
    OpenaiModule,
  ],
})
export class ChatBotsModule {}
