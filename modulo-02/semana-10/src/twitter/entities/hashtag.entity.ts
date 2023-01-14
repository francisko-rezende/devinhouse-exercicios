import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hashtags' })
export class Hashtag {
  @PrimaryGeneratedColumn()
  hashtagId: number;

  @Column({ length: 20, unique: true })
  hashtag: string;
}
