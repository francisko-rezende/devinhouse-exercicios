import { ShoppingCart } from 'src/shopping-carts/entities/shopping-cart.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCategories } from '../utils/product-categories.enum';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('float')
  price: number;

  @Column({ length: 250 })
  description: string;

  @Column('int')
  category: ProductCategories;

  @Column('bool')
  isActive: boolean;

  // @ManyToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.products, {
  //   onDelete: 'SET NULL',
  // })
  shoppingCart?: ShoppingCart;
}
