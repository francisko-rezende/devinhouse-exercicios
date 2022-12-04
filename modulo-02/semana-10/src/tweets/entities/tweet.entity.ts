import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
}
