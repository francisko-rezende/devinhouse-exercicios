import { ShoppingCart } from 'src/shopping-carts/entities/shopping-cart.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ShoppingCartsService {
  constructor(
    @Inject('SHOPPING_CART_REPOSITORY')
    private shoppingCartRepository: Repository<ShoppingCart>,
  ) {}

  async create() {
    return new Promise(async (resolve, reject) => {
      try {
        const cart = { user: 1, total: 0 };
        await this.shoppingCartRepository.insert(cart);
        resolve(cart);
      } catch (error) {
        reject({ code: error.code, detail: error.detail });
      }
    });
  }

  addProductToCart(product: Product) {
    return new Promise(async (resolve, reject) => {
      try {
        const cartToAddProduct = await this.shoppingCartRepository.findOne({
          where: { user: 1 },
          relations: {
            products: true,
          },
        });

        cartToAddProduct.addProduct(product);

        await this.shoppingCartRepository.save(cartToAddProduct);
        resolve(true);
      } catch (error) {
        reject({ code: error.code, detail: error.detail });
      }
    });
  }

  findAllProductsInTheCart() {
    return new Promise(async (resolve, reject) => {
      try {
        const { products } = await this.shoppingCartRepository.findOne({
          where: { user: 1 },
          relations: {
            products: true,
          },
        });

        resolve(products);
      } catch (error) {
        reject(error);
      }
    });
  }

  findAll() {
    return `This action returns all shoppingCarts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shoppingCart`;
  }

  update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    return `This action updates a #${id} shoppingCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingCart`;
  }
}
