import {Component} from '@angular/core';
import {CmsComponent, CmsService} from '@spartacus/core';
import {CmsComponentData} from '@spartacus/storefront';
import {combineLatest, Observable} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {BrandsService} from 'src/app/core/services/brands/brands.service';
import {FrankeProductCategoryInspirationCmsComponent} from 'src/app/shared/models/franke-cms';

@Component({
  selector: 'app-home-product-categories-inspiration-cms',
  templateUrl: './home-product-categories-inspiration-cms.component.html',
  styleUrls: ['./home-product-categories-inspiration-cms.component.scss'],
})
export class HomeProductCategoriesInspirationCmsComponent extends CmsComponentData<CmsComponent> {
  categoriesIndexsToSeparate = [2, 6, 10, 14, 18, 22, 26, 30, 34];

  homeProductsCategoriesCMSComponent$: Observable<FrankeProductCategoryInspirationCmsComponent>;
  items$: Observable<
    FrankeProductCategoryInspirationCmsComponent[]
  > = this.brandsService.currentBrand$.pipe(
    switchMap(() => this.componentData.data$),
    switchMap((data) =>
      combineLatest(
        data.frankeInspirationItemComponents
          .split(' ')
          .map((component) =>
            this.cmsService.getComponentData<FrankeProductCategoryInspirationCmsComponent>(
              component
            )
          )
      )
    ),
    map((filteredCategories) => {
      return filteredCategories.reduce((acc, current, index) => {
        if (this.categoriesIndexsToSeparate.includes(index)) {
          acc.push({...current, class: 'featured'});
        } else {
          acc.push({...current, class: ''});
        }

        if (this.categoriesIndexsToSeparate.includes(index)) {
          acc.push({...current, image: '', class: ''});
        }
        return acc;
      }, []);
    })
  );
  private componentData$: Observable<FrankeProductCategoryInspirationCmsComponent> = this.componentData.data$.pipe(
    filter(Boolean)
  );
  frankeCmsData$: Observable<FrankeProductCategoryInspirationCmsComponent> = this.componentData$.pipe(
    map((data) => data)
  );

  constructor(
    protected cmsService: CmsService,
    protected componentData: CmsComponentData<FrankeProductCategoryInspirationCmsComponent>,
    private brandsService: BrandsService
  ) {
    super();
  }
}
