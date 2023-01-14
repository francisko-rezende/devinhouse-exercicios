import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(280)
  text: string;
}
