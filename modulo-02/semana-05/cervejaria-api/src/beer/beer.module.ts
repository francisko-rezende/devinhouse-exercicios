import { Module } from '@nestjs/common';
import { Database } from 'src/database/database';
import { BeerController } from './beer.controller';
import { BeerService } from './beer.service';
import { IsRegisteredBeerConstraint } from './isRegisteredBeer';

@Module({
  controllers: [BeerController],
  providers: [BeerService, Database, IsRegisteredBeerConstraint],
})
export class BeerModule {}
