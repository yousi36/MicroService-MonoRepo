import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private productService: ProductService) {}

  @MessagePattern('get_products')
  handleGetProducts() {
    return this.productService.getProducts();
  }
}
