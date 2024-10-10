import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/app/services/abstract.service';
import { ChatBot, ChatBotDocument } from './entities/chat-bots.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChatBotsService extends AbstractService<ChatBot> {
  constructor(
    @InjectModel(ChatBot.name)
    readonly model: Model<ChatBotDocument>,
  ) {
    super(model);
  }
}
