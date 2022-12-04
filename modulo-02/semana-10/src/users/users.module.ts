import { usersProviders } from './users.providers';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { databaseProviders } from 'src/core/database/database.providers';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...databaseProviders, ...usersProviders],
})
export class UsersModule {}
