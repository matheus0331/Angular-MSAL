import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {CmsConfig, ConfigModule, I18nModule, UrlModule} from '@spartacus/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IconModule, ListNavigationModule, MediaModule, PaginationModule, SpinnerModule} from '@spartacus/storefront';
import {OrdersListComponent} from './components/orders-list/orders-list.component';
import {NgbdSortableHeader} from './components/sortable.directive';
import {ProductsListModule} from '../products-list/products-list.module';
import {OrdersPaginationComponent} from './components/orders-pagination/orders-pagination.component';
import {OrderDetailsComponent} from './components/order-details/order-details.component';
import {OrderDetailsContainerComponent} from './components/order-details-container/order-details-container.component';
import {OrderDetailsDeliveriesComponent} from './components/order-details-container/deliveries/order-details-deliveries.component';
import {OrderDetailsInvoicesComponent} from './components/order-details-container/invoices/order-details-invoices.component';
import {OrderDetailsItemComponent} from './components/order-details/item/order-details-item.component';
import {
  OrderDetailsItemDeliveryStatusComponent
} from './components/order-details/item-delivery-status/order-details-item-delivery-status.component';
import {
  OrderDetailsDeliveryByCodeComponent
} from './components/order-details-container/deliveries/delivery-by-code/order-details-delivery-by-code.component';
import {
  OrderDetailsDeliveryItemStatusComponent
} from './components/order-details-container/deliveries/delivery-item-status/order-details-delivery-item-status.component';
import {
  OrderDetailsDeliveryStatusComponent
} from './components/order-details-container/deliveries/delivery-status/order-details-delivery-status.component';
import {
  OrderDetaiAlternativeProductsOverlayButtonComponent
} from './components/order-details/alternative-products-overlay-button/order-detail-alternative-products-overlay-button.component';
import {
  OrderDetailsorderDetailsProductReplacementModalContentComponent
} from './components/order-details/product-replacement-modal-content/order-details-product-replacement-modal-content.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {OrderInvoicesComponent} from './components/order-invoices/order-invoices.component';
import {FrankeOrderHistoryService} from '../../core/services/franke-order-history/franke-order-history.service';
import {WindowMoveUtils} from '../../shared/utils/window-move-utils';
import {CustomDateParserFormatter} from '../utils/custom-date-parser-formatter-utils';
import {AlternativeProductsModule} from './../alternative-products/alternative-products.module';
import {FrankePipesModule} from '@modules/pipes/pipes.module';

@NgModule({
  declarations: [
    OrdersListComponent,
    NgbdSortableHeader,
    OrdersPaginationComponent,
    OrderDetailsComponent,
    OrderDetailsContainerComponent,
    OrderDetailsDeliveriesComponent,
    OrderDetailsDeliveryByCodeComponent,
    OrderDetailsDeliveryStatusComponent,
    OrderDetailsDeliveryItemStatusComponent,
    OrderDetailsItemComponent,
    OrderDetailsItemDeliveryStatusComponent,
    OrderDetaiAlternativeProductsOverlayButtonComponent,
    OrderDetailsorderDetailsProductReplacementModalContentComponent,
    OrderInvoicesComponent,
    OrderDetailsInvoicesComponent,
  ],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        AccountOrderHistoryComponent: {
          component: OrdersListComponent,
        },
        FrankeOrderDetailsComponent: {
          component: OrderDetailsContainerComponent,
        },
      },
    } as CmsConfig),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ProductsListModule,
    I18nModule,
    RouterModule,
    UrlModule,
    PaginationModule,
    ListNavigationModule,
    IconModule,
    SpinnerModule,
    NgSelectModule,
    AlternativeProductsModule,
    MediaModule,
    FrankePipesModule,
  ],
  providers: [
    FrankeOrderHistoryService,
    WindowMoveUtils,
    DecimalPipe,
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
  ],
})
export class OrdersModule {
}
