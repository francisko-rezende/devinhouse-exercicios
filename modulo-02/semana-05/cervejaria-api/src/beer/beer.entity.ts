import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BeerTypes } from './beerType.enum';

export class Beer {
  @IsNotEmpty()
  @IsString()
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
