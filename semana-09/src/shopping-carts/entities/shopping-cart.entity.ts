import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'shoppingCart' })
export class ShoppingCart {
  @PrimaryColumn('int')
  user: number;

  @Column('int')
  total: number;

  @ManyToMany(() => Product)
  @JoinTable({ name: 'shoppingCart_products' })
  products: Product[];

  addProduct(productId: Product) {
    console.log(productId);
    if (this.products === null) {
      this.products = new Array<Product>();
    }
    this.products.push(productId);
  }
}

// class AddProductToCartDto {
//   id: number;
// }
