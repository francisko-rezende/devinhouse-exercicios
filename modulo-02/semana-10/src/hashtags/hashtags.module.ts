import { Module } from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { HashtagsController } from './hashtags.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { hashtagsProviders } from './hashtags.providers';

@Module({
  controllers: [HashtagsController],
  providers: [HashtagsService, ...databaseProviders, ...hashtagsProviders],
})
export class HashtagsModule {}
