import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CatalogService } from './catalog.service';

@Controller()
export class CatalogController {
  constructor(private service: CatalogService) {}

  @MessagePattern('get_catalog')
  handleCatalog() {
    return this.service.getCatalog();
  }
}
