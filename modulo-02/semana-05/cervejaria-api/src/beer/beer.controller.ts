import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { NestResponse } from 'src/core/http/nestResponse';
import { NestResponseBuilder } from 'src/core/http/nestResponseBuilder';
import { Beer } from './beer.entity';
import { BeerService } from './beer.service';

@Controller('beers')
export class BeerController {
  constructor(private service: BeerService) {}

  @Get()
  public getBeers(@Query('page') page = 1, @Query('size') size = 10) {
    return this.service.getBeers(page, size);
  }

  @Post()
  public createBeer(@Body() beer: Beer): NestResponse {
    const newBeer = this.service.createBeer(beer);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `beers/${newBeer.name}` })
      .withBody(newBeer)
      .build();
  }
}
