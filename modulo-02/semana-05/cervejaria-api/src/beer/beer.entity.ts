import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BeerTypes } from './beerType.enum';
import { IsRegisteredBeer } from './isRegisteredBeer';

export class Beer {
  @IsNotEmpty()
  @IsString()
  @IsRegisteredBeer()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  brewery: string;

  @IsNotEmpty()
  @IsEnum(BeerTypes)
  type: BeerTypes;
}
