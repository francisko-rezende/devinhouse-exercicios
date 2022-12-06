import { IsNumberString, IsOptional, Matches } from 'class-validator';

export class UserIdQueryDto {
  @IsNumberString()
  userId: string;

  @Matches(/\B#\w*[a-zA-Z]+\w*/)
  @IsOptional()
  hashtag: string;
}
