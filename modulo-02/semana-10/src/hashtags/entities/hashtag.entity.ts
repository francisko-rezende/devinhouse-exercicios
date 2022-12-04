import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hashtags' })
export class Hashtag {
  @PrimaryGeneratedColumn()
  hashtagId: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/\B#\w*[a-zA-Z]+\w*/)
  hashtag: string;
}
