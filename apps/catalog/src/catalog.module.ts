import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@app/lib';
import { Catalog,CatalogSchema } from '@app/lib';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        MongooseModule.forFeature([{ name: Catalog.name, schema: CatalogSchema }]),
      
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}
