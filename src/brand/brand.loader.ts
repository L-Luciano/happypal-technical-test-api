import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { BrandService } from './brand.service';
import { Brand } from './models/brand.model';

export function createBrandsLoader(brandService: BrandService) {
    return new DataLoader<string, Brand>(async (ids) => {
        const brands = await brandService.getBrandsByIds(null, ids);
        const brandMap: Record<string, Brand> = {};
        for (const brand of brands) {
            brandMap[brand.id] = brand;
        }
        return ids.map((id) => brandMap[id] || new Error(`No brand for id : ${id}`));
    });
}