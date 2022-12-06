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
  Query,
} from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { UserIdQueryDto } from './dto/user-id-query.dto';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post()
  async create(@Body() createTweetDto: CreateTweetDto) {
    try {
      return await this.tweetsService.create(createTweetDto);
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('feed')
  async findFeed() {
    try {
      return await this.tweetsService.findFeed();
    } catch (error) {
      throw new HttpException({ detail: error.detail }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('user')
  async findUserTweets(@Query() query: UserIdQueryDto) {
    try {
      const { userId } = query;
      return await this.tweetsService.findUserTweets(+userId);
    } catch (error) {
      throw new HttpException({ detail: error.detail }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':hashtag')
  async findTweetsByHashtag(@Param() param: { hashtag: string }) {
    const { hashtag } = param;
    return await this.tweetsService.findTweetsByHashtag(hashtag);
  }

  @Post('link-hashtag')
  async linkHashtagToTweet(@Body() body) {
    return this.tweetsService.linkHashtagToTweet(body);
  }

  // @Get()
  // findAll() {
  //   return this.tweetsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tweetsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTweetDto: UpdateTweetDto) {
  //   return this.tweetsService.update(+id, updateTweetDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tweetsService.remove(+id);
  // }
}
