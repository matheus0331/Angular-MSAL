import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Brand} from '../../../shared/models/brand';
import {map} from 'rxjs/operators';
import {OccEndpointsService, WindowRef} from '@spartacus/core';
import {WindowStorageService} from '../window-storage/window-storage.service';

const CURRENT_BRAND = 'currentBrand';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  brands$: BehaviorSubject<Brand[]> = new BehaviorSubject([]);
  currentBrand$: BehaviorSubject<Brand> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    protected storage: WindowStorageService,
    protected occEndpointService: OccEndpointsService,
    protected winRef: WindowRef
  ) {
  }

  getBrands(): void {
    this.http
      .get<{ brands: Brand[] }>(
        this.occEndpointService.buildUrl('brands?fields=FULL')
      )
      .pipe(map((response) => response.brands))
      .subscribe((brands) => {
        this.brands$.next(brands);
        const localCurrentBrandCode = this.getCurrentBrand();
        if (localCurrentBrandCode) {
          const localCurrentBrand = brands.find(
            (brand) => brand.code === localCurrentBrandCode
          );
          this.setCurrentBrand(
            localCurrentBrand ? localCurrentBrand.code : brands[0].code
          );
        } else {
          const franksBrand = brands.find((brand) => brand.code === 'franke');
          this.setCurrentBrand(franksBrand ? franksBrand.code : brands[0].code);
        }
      });
  }

  setCurrentBrand(code: string): void {
    this.brands$.subscribe((brands) => {
      this.currentBrand$.next(brands.find((brand) => brand.code === code));
    });
    this.storage.setItemInLocalStorage(CURRENT_BRAND, code);
  }

  getCurrentBrand(): string {
    return this.storage.getItemFromLocalStorage(CURRENT_BRAND);
  }
}
