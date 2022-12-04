import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';

class Address {
  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @IsNumberString()
  @IsNotEmpty()
  readonly number: number;

  @IsString()
  @IsNotEmpty()
  readonly neighborhood: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsNumberString()
  @IsNotEmpty()
  readonly zipCode: number;
}

class PaymentInfo {
  @IsNotEmpty()
  @IsString()
  readonly cardNumber: '4444 4444 4444 4444';

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsDateString()
  @IsNotEmpty()
  readonly cardExpirationDate: Date;

  @IsNotEmpty()
  @IsNumberString()
  readonly cardSecurityCode: '222';
}

export class CompletePurchaseDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @Type(() => Address)
  @ValidateNested()
  readonly address: Address;

  @Type(() => PaymentInfo)
  @ValidateNested()
  readonly paymentInfo: PaymentInfo;
}
