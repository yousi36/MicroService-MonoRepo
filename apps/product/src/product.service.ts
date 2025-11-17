import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  getProducts() {
    return [
      { id: 1, name: 'Keyboard' },
      { id: 2, name: 'Mouse' },
    ];
  }
}

