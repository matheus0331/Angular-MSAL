import {Component} from '@angular/core';
import {Breadcrumb} from '@spartacus/core';
import {ActiveFacetsComponent} from '@spartacus/storefront';

@Component({
  selector: 'app-facets-active-filters',
  templateUrl: './facets-active-filters.component.html',
  styleUrls: ['./facets-active-filters.component.scss'],
})
export class FacetsActiveFiltersComponent extends ActiveFacetsComponent {
  getParams(
    facet: Breadcrumb
  ): {
    [key: string]: string;
  } {
    let str = facet.removeQuery?.query.value;
    if (facet.facetCode === 'familyCodes') {
      if (str.includes('catalog_area')) {
        str = str.substring(0, str.indexOf('FRANKE_S6') + 'FRANKE_S6'.length);
      } else if (str.includes('isBundle:true')) {
        str = str.substring(
          0,
          str.indexOf('isBundle:true') + 'isBundle:true'.length
        );
      } else {
        str = str.substring(0, str.indexOf('false') + 'false'.length);
      }
      return this.facetService.getLinkParams(str);
    }
    return this.facetService.getLinkParams(str);
  }
}
