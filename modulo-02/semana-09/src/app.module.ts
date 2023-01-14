import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ShoppingCartsModule } from './shopping-carts/shopping-carts.module';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ShoppingCartsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
