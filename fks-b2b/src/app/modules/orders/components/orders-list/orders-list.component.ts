import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {NgbdSortableHeader, SortEvent} from '../sortable.directive';
import {FrankeOrderHistoryService} from '@core/services/franke-order-history/franke-order-history.service';
import {FRANKE_ORDER_STATUS, FrankeOrderHistory} from '@shared/models/franke-order';
import {FrankeOrderInvoicesService} from 'src/app/core/services/franke-order-invoices/franke-order-invoices.service';
import {ActivationStart, NavigationEnd, Router} from '@angular/router';
import {WindowMoveUtils} from 'src/app/shared/utils/window-move-utils';
import {OrderTypesList} from '@core/services/franke-order-history/models/order-types.model';

import {RoutingService, TranslationService, WindowRef} from '@spartacus/core';
import {OrderHistoryComponent} from '@spartacus/order/components';
import {OrderHistoryService} from '@spartacus/order/core';
import {ReplenishmentOrderHistoryFacade} from '@spartacus/order/root';

enum OrderStatus {
  AA = 'acknowledged',
  BB = 'confirmed',
  CC = 'completed',
}

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent
  extends OrderHistoryComponent
  implements OnInit, OnDestroy {
  totalOrders$: Observable<number>;
  totalDeliveries$: Observable<number>;
  myOrders$: Observable<FrankeOrderHistory[]>;
  ordersListLoaded$: Observable<boolean>;
  hasOrders$: Observable<boolean>;
  subscription: Subscription;
  pastOrders$: Observable<string[]>;
  monthSelectorVisibility = true;
  totalInvoices$: Observable<number>;
  statusOptions$: BehaviorSubject<{ [k: string]: any }[]> = new BehaviorSubject<
    { [p: string]: any }[]
  >([]);
  optionsTranslations$: Observable<any>;
  orderStatus = {...OrderStatus};
  orderTypes = [...OrderTypesList];

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public service: FrankeOrderHistoryService,
    routing: RoutingService,
    userOrderService: OrderHistoryService,
    translation: TranslationService,
    replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade,
    protected winRef: WindowRef,
    protected invoicesService: FrankeOrderInvoicesService,
    private router: Router,
    protected windowMoveUtils: WindowMoveUtils
  ) {
    super(
      routing,
      userOrderService,
      translation,
      replenishmentOrderHistoryFacade
    );
    this.myOrders$ = service.orders$;
    this.totalOrders$ = service.total$;
    this.ordersListLoaded$ = service.ordersListLoaded$;
    this.hasOrders$ = service.hasOrders$;
    this.prepareStatusOptions();
    this.totalInvoices$ = invoicesService.total$;
  }

  ngOnInit(): void {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof ActivationStart) {
        this.windowMoveUtils.goToTop();
      }

      return;
    });
  }

  prepareStatusOptions(): void {
    this.pastOrders$ = combineLatest([
      this.translation.translate('orderHistory.past3months'),
      this.translation.translate('orderHistory.past6months'),
      this.translation.translate('orderHistory.past9months'),
      this.translation.translate('orderHistory.past12months'),
    ]);

    this.optionsTranslations$ = combineLatest([
      this.translation.translate(
        `orderHistory.status${FRANKE_ORDER_STATUS.ORDER_ACKNOWLEDGED}`
      ),
      this.translation.translate(
        `orderHistory.status${FRANKE_ORDER_STATUS.ORDER_CONFIRMED}`
      ),
      this.translation.translate(
        `orderHistory.status${FRANKE_ORDER_STATUS.DELIVERY_CREATED}`
      ),
    ]);

    this.optionsTranslations$.subscribe((translated) => {
      this.statusOptions$.next([
        {
          code: FRANKE_ORDER_STATUS.ORDER_ACKNOWLEDGED,
          name: translated[0],
        },
        {
          code: FRANKE_ORDER_STATUS.ORDER_CONFIRMED,
          name: translated[1],
        },
        {
          code: FRANKE_ORDER_STATUS.DELIVERY_CREATED,
          name: translated[2],
        },
      ]);
    });
  }

  monthsSelectorVisibility(): void {
    this.monthSelectorVisibility
      ? this.winRef.document
        .getElementsByClassName('past-orders')[0]
        .setAttribute('style', 'visibility: hidden')
      : this.winRef.document
        .getElementsByClassName('past-orders')[0]
        .setAttribute('style', 'visibility: visible');

    this.monthSelectorVisibility = !this.monthSelectorVisibility;
  }

  onSort({column, direction}: SortEvent): void {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  getPastOrders(monthCode: string): void {
    monthCode = monthCode.match(/\d/g).join('');

    this.service.searchOrderNumber = '';
    this.service.searchPurchaseOrderNumber = '';
    this.service.searchOrderStatus = '';
    this.service.loadOrderHistory(Number(monthCode));
  }

  selectOption(opt: string): void {
    this.translation
      .translate(opt)
      .subscribe((result) => (this.service.searchOrderStatus = result));
  }
}
