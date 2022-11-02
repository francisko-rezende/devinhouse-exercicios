import { Database } from './../database/database';
import { Injectable } from '@nestjs/common';
import { Beer } from './beer.entity';
import { GetBeersResult } from 'src/types/GetBeersResult';

@Injectable()
export class BeerService {
  constructor(private database: Database) {}

  createBeer(beer: Beer): Beer {
    this.database.saveBeer(beer);
    return beer;
  }

  getBeers(page: number, size: number) {
    const beers = this.database.getBeers();

    const startIndex = (Number(page) - 1) * Number(size);
    const endIndex = startIndex + Number(size);

    const result: GetBeersResult = {
      data: beers.slice(startIndex, endIndex),
    };

    if (startIndex > 0) {
      result.previous = {
        page: Number(page) - 1,
        size: size,
      };
    }

    if (endIndex < beers.length) {
      result.next = {
        page: Number(page) + 1,
        size: size,
      };
    }

    return result;
  }
}
