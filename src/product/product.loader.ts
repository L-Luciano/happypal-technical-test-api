import { BrandService } from "@/brand/brand.service";
import { Injectable, Scope } from "@nestjs/common";
import DataLoader from "dataloader";

@Injectable({ scope: Scope.REQUEST })
export default class ProductLoaders {
    constructor(
        private brandService: BrandService,
    ) {
    }

    public readonly batchBrands = new DataLoader(async (brandIds: readonly string[]) => {
        const brands = await this.brandService.getBrandsByIds(null, brandIds);
        const brandsMap = new Map(brands.map(brand => [brand.id, brand]));
        return brandIds.map(brandId => brandsMap.get(brandId));
    })
}