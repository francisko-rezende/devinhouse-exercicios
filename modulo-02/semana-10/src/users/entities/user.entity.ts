import { Tweet } from 'src/tweets/entities/tweet.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50 })
  user: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column()
  photoUrl: string;

  @OneToMany(() => Tweet, (tweet) => tweet.user, { cascade: true })
  tweets: Tweet[];

  createTweet(tweetId: Tweet) {
    if (this.tweets === null) {
      this.tweets = new Array<Tweet>();
    }
    this.tweets.push(tweetId);
  }
}
