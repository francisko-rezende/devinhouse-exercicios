import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/twitter/dto/create-user.dto';
import { User } from 'src/twitter/entities/user.entity';
import { Repository } from 'typeorm';
import { CredentialsDto } from './dtos/credentials-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  // signIn(credentialsDto: CredentialsDto) {}

  createUser(createUserDto: CreateUserDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const { password } = createUserDto;
        const newUser = this.userRepository.create(createUserDto);
        newUser.salt = await bcrypt.genSalt(14);
        newUser.password = await this.hashPassword(password, newUser.salt);
        await this.userRepository.save(newUser);
        resolve('Usuário criado com sucesso');
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  private hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  // validateJwt() {}
}
