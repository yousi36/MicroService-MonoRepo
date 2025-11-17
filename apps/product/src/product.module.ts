import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {Product,ProductSchema} from "../../../libs/lib/src/database/schema";
import { DatabaseModule } from '@app/lib';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
      
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
