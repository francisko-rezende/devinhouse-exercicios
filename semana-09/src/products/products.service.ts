import { Product } from './entities/product.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCategories } from './utils/product-categories.enum';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return new Promise(async (resolve, reject) => {
      try {
        const newProduct = {
          ...createProductDto,
          isActive: true,
          category: parseInt(ProductCategories[createProductDto.category]),
        };
        const response = this.productRepository.insert(newProduct);
        const { id } = (await response).generatedMaps[0];
        let created = new Product();
        created = { ...newProduct, id: id };
        resolve(created);
      } catch (error) {
        reject({ code: error.code, detail: error.detail });
      }
    });
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
