import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/twitter/dto/create-user.dto';
import { User } from 'src/twitter/entities/user.entity';
import { Repository } from 'typeorm';
import { CredentialsDto } from './dtos/credentials-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadUserDto } from './dtos/jwt-payload-user.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // signIn(credentialsDto: CredentialsDto) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const { password } = createUserDto;
        const newUser = this.userRepository.create(createUserDto);
        newUser.salt = await bcrypt.genSalt(14);
        newUser.password = await this.hashPassword(password, newUser.salt);
        await this.userRepository.save(newUser);
        resolve(newUser);
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  signIn(credentialsDto: CredentialsDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.findOne({
          where: { email: credentialsDto.email },
        });

        if (!user) {
          reject('Email ou senha inválidos');
        }

        const jwtPayload = {
          userId: user.userId,
          email: user.email,
          name: user.name,
        };

        const token = this.jwtService.sign(jwtPayload);
        resolve(token);
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  changePassword(
    jwtPayloadUser: JwtPayloadUserDto,
    changePasswordDto: ChangePasswordDto,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const { userId } = jwtPayloadUser;
        const { email, oldPassword } = changePasswordDto;

        const user = await this.checkCredentials({
          email,
          password: oldPassword,
        } as CredentialsDto);

        if (user === null) {
          reject(null);
          return;
        }

        user.password = await this.hashPassword(
          changePasswordDto.newPassword,
          user.salt,
        );
        await this.userRepository.save(user);
        resolve('Senha alterada com sucesso');
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  private async checkCredentials(credentialsDto: CredentialsDto) {
    const { email, password } = credentialsDto;
    const user = await this.userRepository.findOne({ where: { email: email } });

    if (user && (await user.checkPassword(password))) {
      return user;
    }

    return null;
  }

  private hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
