import { databaseProviders } from 'src/twitter/core/database/database.providers';
import { Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TwitterController } from './twitter.controller';
import { hashtagsProviders } from './hashtags.providers';
import { tweetsProviders } from './tweets.providers';
import { usersProviders } from './users.providers';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/twitter/core/auth/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 60,
      },
    }),
  ],
  controllers: [TwitterController],
  providers: [
    AuthService,
    TwitterService,
    ...databaseProviders,
    ...hashtagsProviders,
    ...tweetsProviders,
    ...usersProviders,
  ],
})
export class TwitterModule {}
