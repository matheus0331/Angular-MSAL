import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {debounceTime, delay, map, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {GlobalMessageService, GlobalMessageType, LanguageService, OccEndpointsService, RoutingService} from '@spartacus/core';
import {FrankeOrderDetails, FrankeProduct, FrankeReplaceItemInOrder} from '@shared/models/franke-order';
import {SortColumn, SortDirection} from '@modules/orders/components/sortableDetails.directive';
import {OrderHistoryFacade} from '@spartacus/order/root';

interface SearchResult {
  orderDetails: FrankeOrderDetails[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (
  v1: string | number | FrankeProduct,
  v2: string | number | FrankeProduct
) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

let ORDER_DETAILS: FrankeOrderDetails[] = [];

@Injectable({providedIn: 'root'})
export class FrankeOrderDetailsService {
  public orderNumber;
  orderCode$: Observable<string>;
  orderLoad$: any;
  // tslint:disable-next-line: variable-name
  private _searchOrderDetails$ = new Subject<void>();
  // tslint:disable-next-line: variable-name
  private _state: State = {
    page: 1,
    pageSize: 10,
    sortColumn: '',
    sortDirection: '',
  };

  constructor(
    private userOrderService: OrderHistoryFacade,
    protected languageService: LanguageService,
    protected routingService: RoutingService,
    private http: HttpClient,
    protected occEndpointService: OccEndpointsService,
    private globalMessageService: GlobalMessageService
  ) {
  }

  // tslint:disable-next-line: variable-name
  private _loading$ = new BehaviorSubject<boolean>(true);

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  // tslint:disable-next-line: variable-name
  private _orderDetails$ = new BehaviorSubject<FrankeOrderDetails[]>([]);

  get orderDetails$(): Observable<FrankeOrderDetails[]> {
    return this._orderDetails$.asObservable();
  }

  // tslint:disable-next-line: variable-name
  private _total$ = new BehaviorSubject<number>(0);

  get total$(): Observable<number> {
    return this._total$.asObservable();
  }

  // tslint:disable-next-line: variable-name
  private _orderNumber$ = new BehaviorSubject<string>('');

  get orderNumber$(): Observable<string> {
    return this._orderNumber$.asObservable();
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

  set sortColumn(sortColumn: SortColumn) {
    this._set({sortColumn});
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({sortDirection});
  }

  sort(
    orderDetails: FrankeOrderDetails[],
    column: SortColumn,
    direction: string
  ): FrankeOrderDetails[] {
    if (direction === '' || column === '') {
      return orderDetails;
    } else {
      return [...orderDetails].sort((a, b) => {
        if (column === 'orderQuantity' || column === 'netPrice') {
          const res = compare(parseInt(a[column], 10), parseInt(b[column], 10));
          return direction === 'asc' ? res : -res;
        } else if (column === 'material') {
          const res = compare(
            parseInt(a.material.replace(/\./g, ''), 10),
            parseInt(b.material.replace(/\./g, ''), 10)
          );
          return direction === 'asc' ? res : -res;
        } else {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        }
      });
    }
  }

  handleReplaceItemInOrder(replace: FrankeReplaceItemInOrder): void {
    const destroyedReplaceItemInCurrentOrder$ = new Subject<boolean>();

    this._loading$.next(true);
    this.replaceItemInCurrentOrder(replace)
      .pipe(takeUntil(destroyedReplaceItemInCurrentOrder$))
      .subscribe(
        () => {
          this.loadOrderDetails();
          this.globalMessageService.add(
            {
              key: 'orderDetails.alternativeProducts.productReplacedSuccessfully',
            },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );

          destroyedReplaceItemInCurrentOrder$.next(true);
          destroyedReplaceItemInCurrentOrder$.complete();
        },
        () => {
          this.loadOrderDetails();
          this.globalMessageService.add(
            {key: 'orderDetails.alternativeProducts.productReplacedError'},
            GlobalMessageType.MSG_TYPE_ERROR
          );

          destroyedReplaceItemInCurrentOrder$.next(true);
          destroyedReplaceItemInCurrentOrder$.complete();
        }
      );
  }

  replaceItemInCurrentOrder(
    replace: FrankeReplaceItemInOrder
  ): Observable<FrankeOrderDetails> {
    return this.getOrderCode().pipe(
      take(1),
      switchMap((orderCode) =>
        this.replaceItemInOrder({
          ...replace,
          orderCode,
        })
      )
    );
  }

  replaceItemInOrder({
                       orderCode,
                       salesItem,
                       productCode,
                     }: FrankeReplaceItemInOrder): Observable<FrankeOrderDetails> {
    return this.http.patch(
      this.occEndpointService.buildUrl(
        `/users/current/b2bOrders/${orderCode}/update/${salesItem}`
      ),
      {
        material: productCode,
      }
    );
  }

  loadOrderDetails(): void {
    this.userOrderService.clearOrderDetails();
    this._loading$.next(true);
    this.orderCode$ = this.getOrderCode();

    const destroyedOrderCode$ = new Subject<boolean>();
    const destroyedUserOrderService$ = new Subject<boolean>();
    const destroyedSearchOrderDetails$ = new Subject<boolean>();

    this.orderCode$
      .pipe(takeUntil(destroyedOrderCode$))
      .subscribe((orderCode) => {
        if (orderCode) {
          this._orderNumber$.next(orderCode);
          this.userOrderService.loadOrderDetails(orderCode);
        } else {
          this.userOrderService.clearOrderDetails();
        }

        destroyedOrderCode$.next(true);
        destroyedOrderCode$.complete();
      });

    this.userOrderService
      .getOrderDetails()
      .pipe(takeUntil(destroyedUserOrderService$))
      .subscribe((order: any) => {
        if (order.results) {
          destroyedUserOrderService$.next(true);
          destroyedUserOrderService$.complete();

          ORDER_DETAILS = order.results;

          this._searchOrderDetails$
            .pipe(
              takeUntil(destroyedSearchOrderDetails$),
              tap(() => this._loading$.next(true)),
              debounceTime(200),
              switchMap(() => this._searchOrderDetails()),
              delay(200),
              tap(() => this._loading$.next(false))
            )
            .subscribe((result) => {
              this._orderDetails$.next(result.orderDetails);
              this._total$.next(result.total);

              destroyedSearchOrderDetails$.next(true);
              destroyedSearchOrderDetails$.complete();
            });

          this._searchOrderDetails$.next();
        }
      });
  }

  getOrderCode(): Observable<string> {
    return this.routingService
      .getRouterState()
      .pipe(map((routingData) => routingData.state.params.orderCode));
  }

  private _set(patch: Partial<State>): void {
    Object.assign(this._state, patch);
    this._searchOrderDetails$.next();
  }

  private _searchOrderDetails(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page} = this._state;

    // 1. sort
    let orderDetails = this.sort(ORDER_DETAILS, sortColumn, sortDirection);

    // 2. total
    const total = orderDetails.length;

    // 3. paginate
    orderDetails = orderDetails.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({orderDetails, total});
  }
}
