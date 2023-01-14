import { Module } from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';
import { ShoppingCartsController } from './shopping-carts.controller';
import { shoppingCartProviders } from './shopping-carts.providers';
import { databaseProviders } from 'src/core/database/database.providers';

@Module({
  controllers: [ShoppingCartsController],
  providers: [
    ShoppingCartsService,
    ...shoppingCartProviders,
    ...databaseProviders,
  ],
})
export class ShoppingCartsModule {}
