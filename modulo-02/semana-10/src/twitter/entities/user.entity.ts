import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tweet } from './tweet.entity';
import * as bcrypt from 'bcrypt';

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

  @Column()
  password: string;

  @Column()
  salt: string;

  addTweet(tweetId: Tweet) {
    if (this.tweets === null) {
      this.tweets = new Array<Tweet>();
    }
    this.tweets.push(tweetId);
  }

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
