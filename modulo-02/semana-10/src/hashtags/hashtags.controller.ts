import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';

@Controller('hashtags')
export class HashtagsController {
  constructor(private readonly hashtagsService: HashtagsService) {}

  @Post()
  async create(@Body() createHashtagDto: CreateHashtagDto) {
    try {
      return await this.hashtagsService.create(createHashtagDto);
    } catch (error) {
      throw new HttpException(
        { detail: error.detail, code: error.code },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // @Get()
  // findAll() {
  //   return this.hashtagsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.hashtagsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateHashtagDto: UpdateHashtagDto) {
  //   return this.hashtagsService.update(+id, updateHashtagDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.hashtagsService.remove(+id);
  // }
}
