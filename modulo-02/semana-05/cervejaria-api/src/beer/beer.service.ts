import { Database } from './../database/database';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  getBeer(searchedName: string) {
    const beers = this.database.getBeers();
    const checkIfMatchingBeerName = ({ name }) =>
      name.trim().toLowerCase() === searchedName.trim().toLowerCase();

    const searchedBeer = beers.find(checkIfMatchingBeerName);

    if (!searchedBeer) {
      throw new NotFoundException({
        error: 404,
        message: 'Beer not found',
      });
    }

    return searchedBeer;
  }

  updateBeer(beerName: string, beerInfo: Beer) {
    const beers = this.database.getBeers();
    const checkIfMatchingBeerName = ({ name }) =>
      name.trim().toLowerCase() === beerName.trim().toLowerCase();

    const isBeerToUpdateInDatabase = beers.some(checkIfMatchingBeerName);

    if (!isBeerToUpdateInDatabase) {
      throw new NotFoundException({
        error: 404,
        message: 'Beer not found',
      });
    }

    const updatedBeers = beers.map((beer) => {
      const isBeerToUpdate = checkIfMatchingBeerName({ name: beer.name });

      return isBeerToUpdate ? beerInfo : beer;
    });

    this.database.saveBeers(updatedBeers);
  }
}
