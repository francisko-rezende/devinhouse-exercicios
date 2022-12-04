import { DataSource } from 'typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';

export const shoppingCartProviders = [
  {
    provide: 'SHOPPING_CART_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ShoppingCart),
    inject: ['DATA_SOURCE'],
  },
];
