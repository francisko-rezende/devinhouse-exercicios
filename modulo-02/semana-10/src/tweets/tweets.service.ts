import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { FeedTweetDto } from './dto/feed-tweet.dto';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class TweetsService {
  constructor(
    @Inject('TWEETS_REPOSITORY') private tweetsRepository: Repository<Tweet>,
    @Inject('USERS_REPOSITORY') private usersRepository: Repository<User>,
  ) {}

  create(createTweetDto: CreateTweetDto) {
    return new Promise(async (resolve, reject) => {
      try {
        let newTweet = this.tweetsRepository.create();

        newTweet = { ...createTweetDto, ...newTweet };

        const { userId } = createTweetDto;
        const user: User = await this.usersRepository.findOne({
          where: {
            userId: userId,
          },
          relations: {
            tweets: true,
          },
        });

        user.createTweet(newTweet);
        await this.usersRepository.save(user);
        resolve(newTweet);
      } catch (error) {
        reject({ code: error.code, detail: error.detail });
      }
    });
  }

  findFeed(): Promise<FeedTweetDto[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const tweets = await this.tweetsRepository.find({
          relations: { user: true },
          order: { createdAt: 'DESC' },
          take: 20,
        });

        const getFormattedFeedTweet = ({
          text,
          createdAt,
          user: { name, user },
        }): FeedTweetDto => ({
          name,
          user,
          text,
          createdAt,
        });

        const feedTweets = tweets.map(getFormattedFeedTweet);
        resolve(feedTweets);
      } catch (error) {
        reject({ code: error.code, detail: error.detail });
      }
    });
  }
  // findAll() {
  //   return `This action returns all tweets`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} tweet`;
  // }

  // update(id: number, updateTweetDto: UpdateTweetDto) {
  //   return `This action updates a #${id} tweet`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} tweet`;
  // }
}
