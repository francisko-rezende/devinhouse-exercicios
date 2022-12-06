import { Hashtag } from 'src/hashtags/entities/hashtag.entity';
import { User } from 'src/users/entities/user.entity';
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

  @ManyToMany(() => Hashtag)
  @JoinTable({ name: 'tweets_hashtags' })
  hashtags: Hashtag[];

  // linkHashtagToTweet(hashtagId) {
  //   if (this.hashtags === null) {
  //     this.hashtags = new Array<Hashtag>();
  //   }
  //   this.hashtags.push(hashtagId);
  // }
}
