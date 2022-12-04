import { Hashtag } from 'src/hashtags/entities/hashtag.entity';

import { DataSource } from 'typeorm';

export const hashtagsProviders = [
  {
    provide: 'HASHTAGS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Hashtag),
    inject: ['DATA_SOURCE'],
  },
];
