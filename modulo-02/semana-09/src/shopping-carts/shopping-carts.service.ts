import { CompletePurchaseDto } from './dto/complete-purchase.dto';
import { ShoppingCart } from 'src/shopping-carts/entities/shopping-cart.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { Product } from 'src/products/entities/product.entity';
import { isBefore } from 'date-fns';

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
        await this.updateCartTotal();
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

  removeProductFromCart(id: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const shoppingCart = await this.shoppingCartRepository.findOne({
          where: {
            user: 1,
          },
          relations: {
            products: true,
          },
        });

        shoppingCart.removeProduct(id);

        await this.shoppingCartRepository.save(shoppingCart);
        resolve(true);
      } catch (error) {
        reject({ code: error.code, detail: error.detail });
      }
    });
  }

  completePurchase(completePurchaseDto: CompletePurchaseDto) {
    return new Promise(async (resolve, reject) => {
      try {
        if (
          completePurchaseDto.paymentInfo.cardNumber != '4444 4444 4444 4444' ||
          completePurchaseDto.paymentInfo.cardSecurityCode !== '222' ||
          new Date().getTime() >
            new Date(
              completePurchaseDto.paymentInfo.cardExpirationDate,
            ).getTime()
        ) {
          reject({ reason: 'Invalid payment info' });
        }
        const cart = await this.shoppingCartRepository.findOne({
          where: { user: 1 },
          relations: { products: true },
        });
        const total = cart.products.reduce((acc, { price }) => price + acc, 0);
        cart.clearCart();
        await this.shoppingCartRepository.save(cart);
        resolve({ ...completePurchaseDto, total });
      } catch (error) {
        reject({ code: error.code, detail: error.detail });
      }
    });
  }

  async updateCartTotal() {
    const cart = await this.shoppingCartRepository.findOne({
      where: { user: 1 },
      relations: {
        products: true,
      },
    });

    const newTotal = cart.products.reduce((acc, { price }) => acc + price, 0);
    await this.shoppingCartRepository.save({ ...cart, total: newTotal });
  }
}
