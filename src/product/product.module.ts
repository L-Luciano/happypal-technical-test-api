import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PictureModule } from '@/picture/picture.module';

import { Product } from './models/product.model';
import { ProductService } from './product.service';
import { ProductFieldsResolver } from './resolvers/product-fields.resolver';
import { ProductMutationResolver } from './resolvers/product-mutation.resolver';
import { ProductQueriesResolver } from './resolvers/product-queries.resolver';
import ProductLoaders from './product.loader';
import { BrandModule } from '@/brand/brand.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), PictureModule, forwardRef(() => BrandModule)],
  providers: [
    ProductService,
    ProductFieldsResolver,
    ProductQueriesResolver,
    ProductMutationResolver,
    ProductLoaders
  ],
  exports: [ProductService],
})
export class ProductModule { }
