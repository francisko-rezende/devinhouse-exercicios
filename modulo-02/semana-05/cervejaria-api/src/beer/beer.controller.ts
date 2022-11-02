import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { NestResponse } from 'src/core/http/nestResponse';
import { NestResponseBuilder } from 'src/core/http/nestResponseBuilder';
import { Beer } from './beer.entity';
import { BeerService } from './beer.service';

@Controller('beers')
export class BeerController {
  constructor(private service: BeerService) {}

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
