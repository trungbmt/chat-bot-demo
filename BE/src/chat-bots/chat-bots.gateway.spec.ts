import { Test, TestingModule } from '@nestjs/testing';
import { ChatBotGateway } from './chat-bots.gateway';

describe('ChatBotGateway', () => {
  let gateway: ChatBotGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatBotGateway],
    }).compile();

    gateway = module.get<ChatBotGateway>(ChatBotGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
