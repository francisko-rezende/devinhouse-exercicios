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
import { CreateTweetDto } from './dto/create-tweet.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { TwitterService } from './twitter.service';

@Controller()
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Post('tweet')
  async createTweet(@Body() createTweetDto: CreateTweetDto) {
    try {
      return await this.twitterService.createTweet(createTweetDto);
    } catch (error) {
      throw new HttpException(
        { code: error.code, detail: error.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.twitterService.createUser(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.twitterService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.twitterService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTwitterDto: UpdateTwitterDto) {
  //   return this.twitterService.update(+id, updateTwitterDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.twitterService.remove(+id);
  // }
}
