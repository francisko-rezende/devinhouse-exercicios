import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateHashtagDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/\B#\w*[a-zA-Z]+\w*/)
  hashtag: string;
}
