import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productProviders } from './products.provider';
import { databaseProviders } from 'src/core/database/database.providers';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ...productProviders, ...databaseProviders],
})
export class ProductsModule {}
