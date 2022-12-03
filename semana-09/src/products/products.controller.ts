import { CategoryQueryDto } from './dto/category-query.dto';
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
  Res,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';
import { ProductCategories } from './utils/product-categories.enum';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.productsService.create(createProductDto);
    } catch (error) {
      throw new HttpException(
        { code: error.code, details: error.details },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(@Query() query: CategoryQueryDto) {
    const { category } = query;
    try {
      return await this.productsService.findAll(category);
    } catch (error) {
      throw new HttpException(
        { code: error.code, details: error.details },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const searchedProduct = await this.productsService.findOne(+id);
      if (searchedProduct) {
        response.status(HttpStatus.OK).send(searchedProduct);
        return searchedProduct;
      }
      response
        .status(HttpStatus.NOT_FOUND)
        .send(`There is no registered user with the id ${id}`);
      return searchedProduct;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { code: error.code, details: error.details },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
