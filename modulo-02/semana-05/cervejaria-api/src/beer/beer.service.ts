import { Database } from './../database/database';
import { Injectable } from '@nestjs/common';
import { Beer } from './beer.entity';

@Injectable()
export class BeerService {
  constructor(private database: Database) {}

  createBeer(beer: Beer): Beer {
    this.database.saveBeer(beer);
    return beer;
  }
}
