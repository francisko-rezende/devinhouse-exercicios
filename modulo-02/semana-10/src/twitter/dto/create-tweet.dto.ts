import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateTweetDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(280)
  text: string;
}
