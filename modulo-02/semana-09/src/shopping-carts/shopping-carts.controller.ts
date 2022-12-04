import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { Product } from 'src/products/entities/product.entity';
import { CompletePurchaseDto } from './dto/complete-purchase.dto';

@Controller('shopping-carts')
export class ShoppingCartsController {
  constructor(private readonly shoppingCartsService: ShoppingCartsService) {}

  @Post()
  create() {
    return this.shoppingCartsService.create();
  }

  @Post('add-product')
  async addProductToCart(@Body() product: Product) {
    return await this.shoppingCartsService.addProductToCart(product);
  }

  @Get('products')
  async findAllProductsInTheCart() {
    return await this.shoppingCartsService.findAllProductsInTheCart();
  }

  @Delete(':id')
  async removeProductFromCart(@Param('id') productId: number) {
    return this.shoppingCartsService.removeProductFromCart(productId);
  }

  @Post('complete-purchase')
  async completePurchase(@Body() completePurchaseDto: CompletePurchaseDto) {
    try {
      return await this.shoppingCartsService.completePurchase(
        completePurchaseDto,
      );
    } catch (error) {
      if (error.reason == 'Invalid payment info')
        throw new HttpException(
          { detail: error.reason },
          HttpStatus.BAD_REQUEST,
        );
    }
  }
}
