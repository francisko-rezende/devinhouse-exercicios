import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/twitter/core/auth/auth.service';
import { ChangePasswordDto } from './core/auth/dtos/change-password.dto';
import { CredentialsDto } from './core/auth/dtos/credentials-dto';
import { GoogleOAuthGuard } from './core/auth/guards/google.guard';
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
  @UseGuards(GoogleOAuthGuard)
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
  @UseGuards(GoogleOAuthGuard)
  @Get('/auth/me')
  async me(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(GoogleOAuthGuard)
  @Post('/auth/trocar-senha')
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    try {
      await this.authService.changePassword(req.user, changePasswordDto);
    } catch (error) {
      if (!error) {
        throw new UnauthorizedException('E-mail e/ou senha incorretos');
      }
      return { code: error.code, detail: error.detail };
    }
  }
}
