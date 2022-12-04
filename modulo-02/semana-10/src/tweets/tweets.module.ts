import { Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { tweetsProviders } from './tweets.providers';
import { usersProviders } from 'src/users/users.providers';

@Module({
  controllers: [TweetsController],
  providers: [
    TweetsService,
    ...databaseProviders,
    ...tweetsProviders,
    ...usersProviders,
  ],
})
export class TweetsModule {}
