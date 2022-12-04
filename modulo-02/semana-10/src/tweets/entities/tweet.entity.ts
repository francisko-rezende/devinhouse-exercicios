import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tweets' })
export class Tweet {
  @PrimaryGeneratedColumn()
  tweetId: number;

  @Column({ length: 280 })
  text: string;

  @CreateDateColumn()
  createdAt: Date;
}
