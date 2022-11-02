import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Beer } from 'src/beer/beer.entity';

@Injectable()
export class Database {
  private FILENAME = 'beers.json';

  public getBeers(): Beer[] {
    const beersInFile = fs.readFileSync(this.FILENAME).toString();
    const beers = JSON.parse(beersInFile);
    return beers;
  }

  public saveBeers(beers: Beer[]) {
    const stringifiedBeers = JSON.stringify(beers);
    fs.writeFileSync(this.FILENAME, stringifiedBeers);
  }

  public saveBeer(beer: Beer) {
    const beers = this.getBeers();
    const updatedBeers = [...beers, beer];
    this.saveBeers(updatedBeers);
  }
}
