import { IsNumberString } from 'class-validator';

export class UserIdQueryDto {
  @IsNumberString()
  userId: string;
}
