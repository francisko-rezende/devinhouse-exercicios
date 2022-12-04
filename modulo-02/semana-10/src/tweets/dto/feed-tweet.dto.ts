import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class FeedTweetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;
}
