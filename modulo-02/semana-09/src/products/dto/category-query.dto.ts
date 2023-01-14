import { IsEnum, IsOptional } from 'class-validator';
import { ProductCategories } from '../utils/product-categories.enum';

export class CategoryQueryDto {
  @IsOptional()
  @IsEnum(ProductCategories, {
    message:
      "The category query param must be one of the following: 'seguranca', 'redes' or 'acesso'",
  })
  category: ProductCategories;
}
