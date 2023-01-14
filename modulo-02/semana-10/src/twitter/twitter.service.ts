import { Hashtag } from './entities/hashtag.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from './entities/tweet.entity';
import { User } from './entities/user.entity';
import { JwtPayloadUserDto } from './core/auth/dtos/jwt-payload-user.dto';

@Injectable()
export class TwitterService {
  constructor(
    @Inject('TWEETS_REPOSITORY') private tweetsRepository: Repository<Tweet>,
    @Inject('USERS_REPOSITORY') private usersRepository: Repository<User>,
    @Inject('HASHTAGS_REPOSITORY')
    private hashtagsRepository: Repository<Hashtag>,
  ) {}

  createTweet(
    createTweetDto: CreateTweetDto,
    jwtPayloadUser: JwtPayloadUserDto,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const newTweet = this.tweetsRepository.create(createTweetDto);
        const hashtags = this.getHashtags(newTweet.text);
        // console.log(hashtags);
        newTweet.addHashtags(hashtags);

        const { userId } = jwtPayloadUser;
        const user: User = await this.usersRepository.findOne({
          where: {
            userId: userId,
          },
          relations: {
            tweets: true,
          },
        });

        user.addTweet(newTweet);
        // console.log(user);
        await this.usersRepository.save(user);
        resolve(newTweet);
      } catch (error) {
        reject({ code: error.code, detail: error.detail });
      }
    });
  }

  createUser(createUserDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const newUser = this.usersRepository.create(createUserDto);
        await this.usersRepository.save(newUser);
        resolve(newUser);
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  getHashtags(tweet: string) {
    const hashtags = tweet
      .split(' ')
      .filter((word) => word.startsWith('#') && word.length > 1)
      .map((hashtag) => this.hashtagsRepository.create({ hashtag }));

    return hashtags;
  }

  // findAll() {
  //   return `This action returns all twitter`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} twitter`;
  // }

  // update(id: number, updateTwitterDto: UpdateTwitterDto) {
  //   return `This action updates a #${id} twitter`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} twitter`;
  // }
}
