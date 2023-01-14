import { DataSource } from 'typeorm';
import { Tweet } from './entities/tweet.entity';
export const tweetsProviders = [
  {
    provide: 'TWEETS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tweet),
    inject: ['DATA_SOURCE'],
  },
];
