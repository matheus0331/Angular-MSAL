import order_EN from '../../../../assets/locale/en/order.json';
import order_DE_CH from '../../../../assets/locale/de_CH/order.json';
import order_DE from '../../../../assets/locale/de/order.json';
import order_FR_CH from '../../../../assets/locale/fr_CH/order.json';
import order_FR from '../../../../assets/locale/fr/order.json';
import order_IT_CH from '../../../../assets/locale/it_CH/order.json';
import order_IT from '../../../../assets/locale/it/order.json';
import order_NL from '../../../../assets/locale/nl/order.json';
import order_PL from '../../../../assets/locale/pl/order.json';
import order_ES from '../../../../assets/locale/es/order.json';
import order_PT from '../../../../assets/locale/pt/order.json';
import order_NO from '../../../../assets/locale/no/order.json';
import order_SV from '../../../../assets/locale/sv/order.json';
import order_DA from '../../../../assets/locale/da/order.json';

import {Injectable} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {LanguageService, OccEndpointsService, RoutingService} from '@spartacus/core';
import {SortColumn, SortDirection} from '@modules/orders/components/sortable.directive';
import {FRANKE_ORDER_STATUS, FrankeOrderHistory, FrankeOrderHistoryList} from '@shared/models/franke-order';
import {HttpClient} from '@angular/common/http';
import {SearchResultInterface} from './models/search-result.interface';
import {StateInterface} from './models/state.interface';
import {ORDER_TYPES} from './models/order-types.model';
import {UserAccountFacade} from '@spartacus/user/account/root';
import {OrderHistoryFacade} from '@spartacus/order/root';

const compare = (v1: string | number | Date | any, v2: string | number | Date | any) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

let ORDERS: FrankeOrderHistory[] = [];

@Injectable({providedIn: 'root'})
export class FrankeOrderHistoryService {
  orderCode$: Observable<string>;
  orderLoad$: Observable<{}>;
  private _search$ = new Subject<void>();
  private _state: StateInterface = {
    page: 1,
    pageSize: 10,
    searchOrderNumber: '',
    searchPurchaseOrderNumber: '',
    searchOrderStatus: '',
    searchOrderType: ORDER_TYPES.ORDERS,
    sortColumn: '',
    sortDirection: '',
  };
  private currentLanguage = '';

  constructor(
    protected languageService: LanguageService,
    protected routingService: RoutingService,
    private pipe: DecimalPipe,
    private orderHistoryFacade: OrderHistoryFacade,
    private http: HttpClient,
    private occEndpointService: OccEndpointsService,
    private userAccountFacade: UserAccountFacade
  ) {
    this.languageService
      .getActive()
      .subscribe((language: string) => (this.currentLanguage = language));
    this.orderHistoryFacade
      .getOrderHistoryListLoaded()
      .subscribe((isLoaded: boolean) => this._ordersListLoaded$.next(isLoaded));
    this.loadOrderHistory(3);
  }

  private _loading$ = new BehaviorSubject<boolean>(true);

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  private _ordersListLoaded$ = new BehaviorSubject<boolean>(true);

  get ordersListLoaded$(): Observable<boolean> {
    return this._ordersListLoaded$.asObservable();
  }

  private _hasOrders$ = new BehaviorSubject<boolean>(true);

  get hasOrders$(): Observable<boolean> {
    return this._hasOrders$.asObservable();
  }

  private _orders$ = new BehaviorSubject<FrankeOrderHistory[]>([]);

  get orders$(): Observable<FrankeOrderHistory[]> {
    return this._orders$.asObservable();
  }

  private _total$ = new BehaviorSubject<number>(null);

  get total$(): Observable<number> {
    return this._total$.asObservable();
  }

  get page(): number {
    return this._state.page;
  }

  set page(page: number) {
    this._set({page});
  }

  get pageSize(): number {
    return this._state.pageSize;
  }

  set pageSize(pageSize: number) {
    this._set({pageSize});
  }

  get searchOrderNumber(): string {
    return this._state.searchOrderNumber;
  }

  set searchOrderNumber(searchOrderNumber: string) {
    this._set({searchOrderNumber});
  }

  get searchPurchaseOrderNumber(): string {
    return this._state.searchPurchaseOrderNumber;
  }

  set searchPurchaseOrderNumber(searchPurchaseOrderNumber: string) {
    this._set({searchPurchaseOrderNumber});
  }

  get searchOrderStatus(): string {
    return this._state.searchOrderStatus;
  }

  set searchOrderStatus(searchOrderStatus: string) {
    this._set({searchOrderStatus});
  }

  get searchOrderType(): ORDER_TYPES {
    return this._state.searchOrderType;
  }

  set searchOrderType(searchOrderType: ORDER_TYPES) {
    if (!searchOrderType) {
      this._set({searchOrderType: null});
      return;
    }
    this._set({searchOrderType});
  }

  set sortColumn(sortColumn: SortColumn) {
    this._set({sortColumn});
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({sortDirection});
  }

  loadOrderHistory(months: number): void {
    this._ordersListLoaded$.next(false);
    this.userAccountFacade.get().subscribe((user) => {
      this.getOrderHistory(months, user.uid).subscribe(
        (orders: FrankeOrderHistoryList) => {
          if (orders.results) {
            ORDERS = orders.results;
            this._ordersListLoaded$.next(true);

            orders.results.length > 0
              ? this._hasOrders$.next(true)
              : this._hasOrders$.next(false);

            this._search$
              .pipe(
                tap(() => this._loading$.next(true)),
                debounceTime(200),
                switchMap(() => this._search()),
                delay(200),
                tap(() => this._loading$.next(false))
              )
              .subscribe((result) => {
                this._orders$.next(result.orders);
                this._total$.next(result.total);
              });

            this._search$.next();
          }
        }
      );
    });
  }

  getOrderHistory(
    months: number,
    uid: string
  ): Observable<FrankeOrderHistoryList> {
    return this.http
      .get<FrankeOrderHistoryList>(
        this.occEndpointService.buildUrl(
          `/users/${uid}/b2bOrders?pageSize=1000&numMonths=${months}`
        )
      )
      .pipe(
        catchError(() => {
          this._ordersListLoaded$.next(true);
          this._hasOrders$.next(false);
          this._total$.next(0);

          return of({});
        })
      );
  }

  sort(
    orders: FrankeOrderHistory[],
    column: SortColumn,
    direction: string
  ): FrankeOrderHistory[] {
    if (direction === '' || column === '') {
      return orders;
    } else {
      return [...orders].sort((a, b) => {
        if (column === 'total') {
          const res = compare(a.total.value, b.total.value);
          return direction === 'asc' ? res : -res;
        } else {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        }
      });
    }
  }

  matchesOrderNumber(order: FrankeOrderHistory, orderNumber: string): boolean {
    return order.code.toString().includes(orderNumber.toLowerCase());
  }

  matchesPurchaseOrderNumber(
    order: FrankeOrderHistory,
    searchPurchaseOrderNumber: string
  ): boolean {
    return order.purchaseOrderNumber
      .toLowerCase()
      .includes(searchPurchaseOrderNumber.toLowerCase());
  }

  matchesOrderType(order: FrankeOrderHistory, orderType: ORDER_TYPES): boolean {
    return orderType
      .split(',')
      .some((type) => order.salesDocType.toLowerCase() === type.toLowerCase());
  }

  matchesOrderStatus(order: FrankeOrderHistory, orderStatus: string): boolean {
    let status = '';
    switch (order.condensedStatus) {
      case FRANKE_ORDER_STATUS.ORDER_ACKNOWLEDGED:
        status = FRANKE_ORDER_STATUS.ORDER_ACKNOWLEDGED;
        break;
      case FRANKE_ORDER_STATUS.ORDER_CONFIRMED:
        status = FRANKE_ORDER_STATUS.ORDER_CONFIRMED;
        break;
      case FRANKE_ORDER_STATUS.DELIVERY_CREATED:
        status = FRANKE_ORDER_STATUS.DELIVERY_CREATED;
        break;
      case FRANKE_ORDER_STATUS.PICKED:
        status = FRANKE_ORDER_STATUS.PICKED;
        break;
      case FRANKE_ORDER_STATUS.SHIPPED:
        status = FRANKE_ORDER_STATUS.SHIPPED;
        break;
      case FRANKE_ORDER_STATUS.DELIVERED:
        status = FRANKE_ORDER_STATUS.DELIVERED;
        break;
      default:
        console.error('Unhandled order status:', order.condensedStatus);
        status = order.condensedStatus;
        break;
    }

    try {
      switch (this.currentLanguage) {
        case 'de_CH': {
          return order_DE_CH.orderHistory['status' + status]
            .toLowerCase()
            .includes(orderStatus.toLowerCase());
        }
        case 'de': {
          return order_DE.orderHistory['status' + status]
            .toLowerCase()
            .includes(orderStatus.toLowerCase());
        }
        case 'fr_CH': {
          return order_FR_CH.orderHistory['status' + status]
            .toLowerCase()
            .includes(orderStatus.toLowerCase());
        }
        case 'fr': {
          return order_FR.orderHistory['status' + status]
            .toLowerCase()
            .includes(orderStatus.toLowerCase());
        }
        case 'it_CH': {
          return order_IT_CH.orderHistory['status' + status]
            .toLowerCase()
            .includes(orderStatus.toLowerCase());
        }
        case 'it': {
          return order_IT.orderHistory['status' + status]
            .toLowerCase()
            .includes(orderStatus.toLowerCase());
        }
        case 'nl': {
          return order_NL.orderHistory['status' + status]
            .toLowerCase()
            .includes(orderStatus.toLowerCase());
        }
        case 'pl': {
          return order_PL.orderHistory['status' + status]
            .toLowerCase()
            .includes(orderStatus.toLowerCase());
        }
        case 'es': {
          return order_ES.orderHistory['status' + status]
            .toLowerCase()
            .includes(orderStatus.toLowerCase());
        }
        case 'pt': {
          return order_PT.orderHistory['status' + status]
            .toLowerCase()
            .includes(orderStatus.toLowerCase());
        }
        case 'no': {
          return order_NO.orderHistory['status' + status]
            .toLowerCase()
            .includes(orderStatus.toLowerCase());
        }
        case 'sv': {
          return order_SV.orderHistory['status' + status]
            .toLowerCase()
            .includes(orderStatus.toLowerCase());
        }
        case 'da': {
          return order_DA.orderHistory['status' + status]
            .toLowerCase()
            .includes(orderStatus.toLowerCase());
        }
        default: {
          return order_EN.orderHistory['status' + status]
            .toLowerCase()
            .includes(orderStatus.toLowerCase());
        }
      }
    } catch (error) {
      console.error('Error occurred while processing the order status:', error);
      return false;
    }
  }

  private _set(patch: Partial<StateInterface>): void {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResultInterface> {
    const {
      sortColumn,
      sortDirection,
      pageSize,
      page,
      searchOrderNumber,
      searchPurchaseOrderNumber,
      searchOrderStatus,
      searchOrderType,
    } = this._state;

    // 1. sort
    let orders = this.sort(ORDERS, sortColumn, sortDirection);

    // 2. filter
    orders = orders.filter((order) =>
      this.matchesOrderNumber(order, searchOrderNumber)
    );
    orders = orders.filter((order) =>
      this.matchesPurchaseOrderNumber(order, searchPurchaseOrderNumber)
    );
    orders = orders.filter((order) =>
      this.matchesOrderStatus(order, searchOrderStatus)
    );
    orders = orders.filter((order) =>
      this.matchesOrderType(order, searchOrderType)
    );

    const total = orders.length;

    // 3. paginate
    orders = orders.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({orders, total});
  }
}
