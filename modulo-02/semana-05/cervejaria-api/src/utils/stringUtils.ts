import { Injectable } from '@nestjs/common';

@Injectable()
export class StringUtils {
  public standardizeName(name: string) {
    return name.trim().toLowerCase();
  }
}
