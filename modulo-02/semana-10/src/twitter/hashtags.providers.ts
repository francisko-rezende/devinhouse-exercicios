import { DataSource } from 'typeorm';
import { Hashtag } from './entities/hashtag.entity';

export const hashtagsProviders = [
  {
    provide: 'HASHTAGS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Hashtag),
    inject: ['DATA_SOURCE'],
  },
];
