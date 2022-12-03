import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { Product } from 'src/products/entities/product.entity';

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

  @Get()
  findAll() {
    return this.shoppingCartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoppingCartsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShoppingCartDto: UpdateShoppingCartDto,
  ) {
    return this.shoppingCartsService.update(+id, updateShoppingCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingCartsService.remove(+id);
  }
}
