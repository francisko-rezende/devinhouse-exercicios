import { User } from './user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hashtag } from './hashtag.entity';

@Entity({ name: 'tweets' })
export class Tweet {
  @PrimaryGeneratedColumn()
  tweetId: number;

  @Column({ length: 280 })
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tweets, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Hashtag, { cascade: true })
  @JoinTable({ name: 'tweets_hashtags' })
  hashtags: Hashtag[];

  addHashtags(hashtags: Hashtag[]) {
    if (!this.hashtags) {
      this.hashtags = new Array<Hashtag>();
    }
    this.hashtags.push(...hashtags);
  }
}
