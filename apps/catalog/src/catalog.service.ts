import { Injectable } from '@nestjs/common';

@Injectable()
export class CatalogService {
  getCatalog() {
    return [
      { id: 1, category: 'Electronics' },
      { id: 2, category: 'Grocery' },
    ];
  }
}
