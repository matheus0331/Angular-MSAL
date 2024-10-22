import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FacetValue} from '@spartacus/core';

import {FacetComponent} from '@spartacus/storefront';

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacetsComponent
  extends FacetComponent
  implements OnInit, AfterViewInit {
  public isCollapsed = true;

  ngOnInit(): void {
    if (this.facet.code !== 'product_status') {
      this.facet.values.some((facet) => {
        if (facet.selected) {
          this.isCollapsed = false;
        }
      });
    }
  }

  ngAfterViewInit(): void {
    const heading = this.elementRef.nativeElement.getElementsByClassName(
      'heading'
    )[0];
    if (this.facet.code !== 'product_status') {
      this.facet.values.some((facet) => {
        if (facet.selected) {
          heading.classList.add('heading-active');
        }
      });
    }
  }

  toggleFilter(): void {
    const heading = this.elementRef.nativeElement.getElementsByClassName(
      'heading'
    )[0];
    this.isCollapsed = !this.isCollapsed;
    if (!this.isCollapsed) {
      heading.classList.add('heading-active');
    } else {
      heading.classList.remove('heading-active');
    }
  }

  getQueryParamsProductFamily(
    value: FacetValue
  ): {
    [key: string]: string;
  } {
    const regEx = /familyCodes:[\d]+:/;
    const str = value.query?.query.value;
    // removes the first occurrence of the family codes so that only one is selected at a time
    let result = str.replace(regEx, '');

    // if changing family code remove the current applied filters to avoid confusion
    if (result.split(':').splice(-3)[0] !== 'false') {
      if (result.split(':').splice(-2)[0] === 'familyCodes') {
        const familyCode = result.split(':').splice(-2)[1];
        if (result.includes('catalog_area')) {
          result = result.substring(
            0,
            result.indexOf('FRANKE_S6') + 'FRANKE_S6'.length
          );
        } else if (result.includes('isBundle:true')) {
          result = result.substring(
            0,
            result.indexOf('isBundle:true') + 'isBundle:true'.length
          );
        } else if (result.includes(':false')) {
          result = result.substring(
            0,
            result.indexOf('false') + 'false'.length
          );
        }
        if (!result.includes(':familyCodes')) {
          result = result + `:familyCodes:${familyCode}`;
        }
      } else {
        result = result.substring(0, result.indexOf('false') + 'false'.length);
      }
    }

    // when unselecting the current family code, it removes all filters applied
    if (result.lastIndexOf('familyCodes:') < 0) {
      if (result.includes('catalog_area')) {
        return this.facetService.getLinkParams(result);
      } else if (result.includes('isBundle:true')) {
        return this.facetService.getLinkParams(result);
      }
      result = result.substring(0, result.lastIndexOf('familyCodes:'));
    }

    const ret = this.facetService.getLinkParams(result);
    return ret;
  }
}
