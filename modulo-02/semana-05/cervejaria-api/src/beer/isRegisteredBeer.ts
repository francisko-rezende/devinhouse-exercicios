import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Database } from 'src/database/database';

@Injectable()
@ValidatorConstraint()
export class IsRegisteredBeerConstraint
  implements ValidatorConstraintInterface
{
  constructor(private database: Database) {}

  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const beers = this.database.getBeers();
    const doesValueMatchName = ({ name }: { name: string }) =>
      name.toLowerCase().trim() === value.toLowerCase().trim();
    const isRegistered = beers.some(doesValueMatchName);
    const isValid = !isRegistered;
    return isValid;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Beer name must not match any beers registered in the database.';
  }
}

export function IsRegisteredBeer(validationOptions?: ValidationOptions) {
  return function (obj: any, prop: string) {
    registerDecorator({
      target: obj.constructor,
      propertyName: prop,
      options: validationOptions,
      validator: IsRegisteredBeerConstraint,
    });
  };
}
