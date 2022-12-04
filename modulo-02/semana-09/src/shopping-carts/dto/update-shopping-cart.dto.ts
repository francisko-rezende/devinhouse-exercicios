import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingCartDto } from './create-shopping-cart.dto';

export class UpdateShoppingCartDto extends PartialType(CreateShoppingCartDto) {}
