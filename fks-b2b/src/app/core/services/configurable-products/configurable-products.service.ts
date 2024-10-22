import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OccEndpointsService} from '@spartacus/core';
import {AttributeOption, ConfigurableProduct, Domainvalue} from 'src/app/shared/models/configurable-product';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {CartActions, StateWithMultiCart} from '@spartacus/cart/base/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigurableProductsService {
  configurableProduct: ConfigurableProduct;
  productCode: string;

  constructor(
    private http: HttpClient,
    private occEndpointService: OccEndpointsService,
    private store: Store<StateWithMultiCart>
  ) {
  }

  getVariants(productCode: string): Observable<ConfigurableProduct> {
    return this.http.get<ConfigurableProduct>(
      this.occEndpointService.buildUrl(
        '/products/' + productCode + '/configuration'
      )
    );
  }

  postVariants(currentUser: string, currentCart: string): void {
    this.http
      .post(
        this.occEndpointService.buildUrl(
          '/users/' + currentUser + '/carts/' + currentCart + '/configuration'
        ),
        this.configurableProduct
      )
      .subscribe(() => {
        this.store.dispatch(
          new CartActions.LoadCart({userId: currentUser, cartId: currentCart})
        );
      });
  }

  updateDomainValue(
    domainValue: Domainvalue,
    attributeOption: AttributeOption
  ): void {
    this.configurableProduct.groups[0].cstics[0].domainvalues.forEach(
      (domain) => {
        if (domain.attributeCode === domainValue.attributeCode) {
          domain = this.setDomainValue(domainValue, attributeOption);
        }
      }
    );
  }

  setConfigurableProduct(configurableProduct: ConfigurableProduct): void {
    this.configurableProduct = configurableProduct;
    this.configurableProduct.groups[0].cstics[0].domainvalues.forEach(
      (option) => {
        option = this.setDomainValue(option, option.attributeOptions[0]);
      }
    );
  }

  setProductCode(productCode: string): void {
    this.productCode = productCode;
  }

  setQuantity(quantity: any): void {
    this.configurableProduct.quantity = quantity;
  }

  setDomainValue(
    domainValue: Domainvalue,
    attributoOption: AttributeOption
  ): Domainvalue {
    domainValue.key = attributoOption.key;
    domainValue.langdepname = attributoOption.langdepname;
    domainValue.longTextHTMLFormat = attributoOption.longTextHTMLFormat;
    domainValue.name = attributoOption.name;
    domainValue.readonly = attributoOption.readonly;
    domainValue.selected = attributoOption.selected;
    domainValue.showDeltaPrice = attributoOption.showDeltaPrice;
    return domainValue;
  }
}
