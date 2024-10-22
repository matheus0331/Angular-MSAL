import {Injectable} from '@angular/core';
import {WindowRef} from '@spartacus/core';
import {Observable} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {Brand} from 'src/app/shared/models/brand';
import {BrandsService} from '../brands/brands.service';
import {carronphoenix, dominox, eurodomo, faber, franke, kindred, kwc, mepamsa, roblin, Theme} from './themes';

@Injectable({
  providedIn: 'root',
})
export class FrankeThemeService {
  public activeTheme: Observable<Theme> = this.brandsService.currentBrand$.pipe(
    filter((brand) => !!brand),
    map((brand) => this.getThemeByBrand(brand)),
    tap((theme) => {
      this.setThemeVariables(theme);
    })
  );

  private availableThemes: Theme[] = [
    franke,
    faber,
    carronphoenix,
    dominox,
    eurodomo,
    kindred,
    kwc,
    mepamsa,
    roblin,
  ];

  constructor(private winRef: WindowRef, private brandsService: BrandsService) {
    this.activeTheme.subscribe();
  }

  getThemeByBrand(currentBrand: Brand): Theme {
    return this.availableThemes.find(
      (theme) => theme.name === currentBrand.code
    );
  }

  setThemeVariables(theme: Theme): void {
    try {
      Object.keys(theme.properties).forEach((property) => {
        this.winRef.document.documentElement.style.setProperty(
          property,
          theme.properties[property]
        );
      });
    } catch (error) {
      // nothing
    }
  }
}
