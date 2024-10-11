import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ChatBotsService } from './chat-bots.service';
import { CreateChatBotDto } from './dto/create-chat-bot.dto';
import { UpdateChatBotDto } from './dto/update-chat-bot.dto';
import { ChatBot } from './entities/chat-bots.entity';
import getSortObjFromQuery from 'src/helper/getSortObjFromQuery';
import {
  ParseArrayObjectIdPipe,
  ParseObjectIdPipe,
} from 'src/app/pipes/validation.pipe';
import { Types } from 'mongoose';
import SortPaginate from 'src/app/types/sort-paginate';
import { OpenAiService } from 'src/openai/openai.service';
import { Response } from 'express';
import { ChatBotGateway } from './chat-bots.gateway';
@Controller('chat-bots/')
export class ChatBotsController {
  constructor(
    private readonly chatBotsService: ChatBotsService,
    private readonly openAiService: OpenAiService,
    private readonly chatBotsGateway: ChatBotGateway,
  ) {}

  @Post()
  async handleMessage(
    @Body() { socketId, message, uuid, model },
    @Res() res: Response,
  ) {
    this.openAiService.generateResponse(message, model, (text, isLastChunk) => {
      const eventName = `chat-generating-${uuid}`;
      this.chatBotsGateway.server
        .to(socketId)
        .emit(eventName, { text, isLastChunk });
    });
    return res.status(HttpStatus.CREATED).send();
  }
  @Post('bulk/create')
  createBulk(@Body() createChatBotDto: CreateChatBotDto[]) {
    return this.chatBotsService.createArray(createChatBotDto);
  }
  @Get()
  findAll(
    @Query()
    query: (ChatBot & SortPaginate) | any,
  ) {
    const sortObj = getSortObjFromQuery(query?.sort);
    delete query?.sort;
    const queries = {
      ...query,
      ...(query?.name && {
        name: { $regex: query?.name?.normalize(), $options: 'i' },
      }),

      // ...(query?.ownerId && {
      //   ownerId: new Types.ObjectId(query?.ownerId),
      // }),
      ...(Number(query?.startTime) &&
        Number(query?.endTime) && {
          createdAt: {
            $gte: new Date(Number(query?.startTime)),
            $lte: new Date(Number(query?.endTime)),
          },
        }),
    };
    return this.chatBotsService.findAllWithPaginate(
      queries,
      {},
      sortObj,
      query?.page,
      query?.perPage,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.chatBotsService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatBotDto: UpdateChatBotDto) {
    return this.chatBotsService.updateOne(id, updateChatBotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatBotsService.deleteOneById(id);
  }
  @Delete('bulk/delete')
  deleteBulk(@Body('ids', ParseArrayObjectIdPipe) ids: Types.ObjectId[]) {
    return this.chatBotsService.deleteMany({
      _id: {
        $in: ids,
      },
    });
  }
}
