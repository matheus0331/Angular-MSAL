import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {OccEndpointsService} from '@spartacus/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from 'src/app/modules/orders/components/sortable.directive';
import {FrankeOrderInvoices} from 'src/app/shared/models/franke-order';
import {FrankeOrderDetailsService} from '../franke-order-details/franke-order-details.service';
import {UserAccountFacade} from '@spartacus/user/account/root';

interface SearchResult {
  orderInvoices: FrankeOrderInvoices[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchInvoiceNumber: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (
  v1: string | number | number[],
  v2: string | number | number[]
) => {
  if (Array.isArray(v1) && v1.length >= 3 && Array.isArray(v2) && v2.length >= 3) {
    const v1Date = new Date(v1[0], v1[1], v1[2]);
    const v2Date = new Date(v2[0], v2[1], v2[2]);
    return v1Date < v2Date ? -1 : v1Date > v2Date ? 1 : 0;
  }

  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
};

let ORDER_INVOICES: FrankeOrderInvoices[] = [];

@Injectable({
  providedIn: 'root',
})
export class FrankeOrderDetailsInvoicesService {
  orderCode$: Observable<string>;
  currentOrderCode: string;
  // tslint:disable-next-line: variable-name
  private _searchOrderInvoices$ = new Subject<void>();
  // tslint:disable-next-line: variable-name
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchInvoiceNumber: '',
    sortColumn: '',
    sortDirection: '',
  };

  constructor(
    private http: HttpClient,
    private occEndpointService: OccEndpointsService,
    private userAccountFacade: UserAccountFacade,
    private frankeOrderDetailsService: FrankeOrderDetailsService
  ) {
    this.orderCode$ = this.frankeOrderDetailsService.getOrderCode();

    this.orderCode$
      .subscribe((orderCode) => {
        if (orderCode) {
          this.currentOrderCode = orderCode;
        }
      })
      .unsubscribe();

    this.userAccountFacade.get().subscribe((user) => {
      this.getOrderInvoices(user.uid, this.currentOrderCode).subscribe((invoices: any) => {
        if (invoices) {
          ORDER_INVOICES = invoices;

          this._invoicesListLoaded$.next(true);

          invoices.length > 0
            ? this._hasInvoices$.next(true)
            : this._hasInvoices$.next(false);

          this._searchOrderInvoices$
            .pipe(
              tap(() => this._loading$.next(true)),
              debounceTime(200),
              switchMap(() => this._searchOrderInvoices()),
              delay(200),
              tap(() => this._loading$.next(false))
            )
            .subscribe((result) => {
              this._orderInvoices$.next(result.orderInvoices);
              this._total$.next(result.total);
            });

          this._searchOrderInvoices$.next();
        }
      });
    });
  }

  // tslint:disable-next-line: variable-name
  private _loading$ = new BehaviorSubject<boolean>(true);

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  // tslint:disable-next-line: variable-name
  private _invoicesListLoaded$ = new BehaviorSubject<boolean>(false);

  get invoicesListLoaded$(): Observable<boolean> {
    return this._invoicesListLoaded$.asObservable();
  }

  // tslint:disable-next-line: variable-name
  private _hasInvoices$ = new BehaviorSubject<boolean>(false);

  get hasInvoices$(): Observable<boolean> {
    return this._hasInvoices$.asObservable();
  }

  // tslint:disable-next-line: variable-name
  private _orderInvoices$ = new BehaviorSubject<FrankeOrderInvoices[]>([]);

  get orderInvoices$(): Observable<FrankeOrderInvoices[]> {
    return this._orderInvoices$.asObservable();
  }

  // tslint:disable-next-line: variable-name
  private _total$ = new BehaviorSubject<number>(0);

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

  get searchInvoiceNumber(): string {
    return this._state.searchInvoiceNumber;
  }

  set searchInvoiceNumber(searchInvoiceNumber: string) {
    this._set({searchInvoiceNumber});
  }

  set sortColumn(sortColumn: SortColumn) {
    this._set({sortColumn});
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({sortDirection});
  }

  getOrderInvoices(uid: string, currentOrderCode: string): Observable<FrankeOrderInvoices> {
    return this.http
      .get<FrankeOrderInvoices>(
        this.occEndpointService.buildUrl('/users/' + uid + '/b2bOrders/' + currentOrderCode + '/invoices')
      )
      .pipe(
        catchError(() => {
          this._invoicesListLoaded$.next(true);
          this._hasInvoices$.next(false);
          this._total$.next(0);

          return of({});
        })
      );
  }

  sort(
    orderInvoices: FrankeOrderInvoices[],
    column: SortColumn,
    direction: string
  ): FrankeOrderInvoices[] {
    if (direction === '' || column === '') {
      return orderInvoices;
    } else {
      return [...orderInvoices].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  matchesInvoiceNumber(
    invoice: FrankeOrderInvoices,
    invoiceNumber: string
  ): boolean {
    return invoice.invoiceNumber
      .toString()
      .includes(invoiceNumber.toLowerCase());
  }

  private _set(patch: Partial<State>): void {
    Object.assign(this._state, patch);
    this._searchOrderInvoices$.next();
  }

  private _searchOrderInvoices(): Observable<SearchResult> {
    const {
      sortColumn,
      sortDirection,
      searchInvoiceNumber,
      pageSize,
      page,
    } = this._state;

    // 1. sort
    let orderInvoices = this.sort(ORDER_INVOICES, sortColumn, sortDirection);

    // 2. total
    const total = orderInvoices.length;

    orderInvoices = orderInvoices.filter((invoice) =>
      this.matchesInvoiceNumber(invoice, searchInvoiceNumber)
    );

    // 3. paginate
    orderInvoices = orderInvoices.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({orderInvoices, total});
  }
}
