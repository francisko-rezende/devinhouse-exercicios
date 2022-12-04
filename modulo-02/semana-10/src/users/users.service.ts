import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const hasPhotoUrl = !!createUserDto?.photoUrl;

        const userToCreate = hasPhotoUrl
          ? createUserDto
          : { ...createUserDto, photoUrl: 'http://pudim.com.br/' };

        const newUser = this.usersRepository.create(userToCreate);
        const createdUser = await this.usersRepository.save(newUser);
        resolve(createdUser);
      } catch (error) {
        reject(error);
      }
    });
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
