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

  getFormattedTweetData = ({
    text,
    createdAt,
    user: { name, user },
  }): FeedTweetDto => ({
    name,
    user,
    text,
    createdAt,
  });

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

        const feedTweets = tweets.map(this.getFormattedTweetData);
        resolve(feedTweets);
      } catch (error) {
        reject({ code: error.code, detail: error.detail });
      }
    });
  }

  findUserTweets(userId: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const userTweets = await this.tweetsRepository.find({
          relations: { user: true },
          where: { user: { userId: userId } },
          order: { createdAt: 'DESC' },
        });
        const formattedTweets = userTweets.map(this.getFormattedTweetData);
        resolve(formattedTweets);
      } catch (error) {
        reject(error);
      }
    });
  }

  linkHashtagToTweet(body) {
    return new Promise(async (resolve) => {
      const { tweetId, hashtagId } = body;

      const linkedTweet = this.tweetsRepository.create({
        tweetId: tweetId,
        hashtags: [{ hashtagId: hashtagId }],
      });

      this.tweetsRepository.save(linkedTweet);
      resolve(true);
    });
  }

  findTweetsByHashtag(hashtag: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const tweets = await this.tweetsRepository.find({
          relations: {
            hashtags: true,
          },
        });

        const tweetsWithHashtag = this.getTweetsWithHashtags(tweets, hashtag);

        resolve(tweetsWithHashtag);
      } catch (error) {
        reject(error);
      }
    });
  }

  getTweetsWithHashtags(tweets: Tweet[], searchedHashtag: string) {
    const checkIfHasHashTag = ({ hashtag }) =>
      hashtag === `#${searchedHashtag}`;

    const handleFilteringByHashtag = ({ hashtags }) =>
      hashtags.some(checkIfHasHashTag);

    return tweets.filter(handleFilteringByHashtag);
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
