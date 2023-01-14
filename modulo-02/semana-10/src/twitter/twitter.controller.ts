import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from 'src/twitter/core/auth/auth.service';
import { CredentialsDto } from './core/auth/dtos/credentials-dto';
import { JwtAuthGuard } from './core/auth/guards/jwt-auth-guard';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { TwitterService } from './twitter.service';

@Controller()
export class TwitterController {
  constructor(
    private readonly twitterService: TwitterService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('tweet')
  async createTweet(@Body() createTweetDto: CreateTweetDto, @Request() req) {
    try {
      return await this.twitterService.createTweet(createTweetDto, req.user);
    } catch (error) {
      throw new HttpException(
        { code: error.code, detail: error.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const { email, password } = await this.authService.createUser(
        createUserDto,
      );
      const credentials: CredentialsDto = { email, password };
      return await this.signIn(credentials);
    } catch (error) {
      return { code: error.code, detail: error.detail };
    }
  }

  @Post('sign-in')
  async signIn(@Body() credentialsDto: CredentialsDto) {
    try {
      const token = await this.authService.signIn(credentialsDto);
      return { token };
    } catch (error) {
      return { code: error.code, detail: error.detail };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/auth/me')
  async me(@Request() req) {
    return req.user;
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
