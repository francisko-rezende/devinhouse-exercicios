import { databaseProviders } from 'src/core/database/database.providers';
import { Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TwitterController } from './twitter.controller';
import { hashtagsProviders } from './hashtags.providers';
import { tweetsProviders } from './tweets.providers';
import { usersProviders } from './users.providers';

@Module({
  controllers: [TwitterController],
  providers: [
    TwitterService,
    ...databaseProviders,
    ...hashtagsProviders,
    ...tweetsProviders,
    ...usersProviders,
  ],
})
export class TwitterModule {}
