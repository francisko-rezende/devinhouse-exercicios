import { Beer } from 'src/beer/beer.entity';

interface PaginationMeta {
  page: number;
  size: number;
}

export interface GetBeersResult {
  data: Beer[];
  next?: PaginationMeta;
  previous?: PaginationMeta;
}
