import {DecimalPipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component, QueryList, ViewChildren} from '@angular/core';
import {OccEndpointsService} from '@spartacus/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {FrankeOrderDetailsInvoicesService} from '@core/services/franke-order-details-invoices/franke-order-details-invoices.service';
import {WindowStorageService} from 'src/app/core/services/window-storage/window-storage.service';
import {FrankeOrderInvoices} from 'src/app/shared/models/franke-order';
import {NgbdSortableHeader, SortEvent} from '../../sortable.directive';
import {FrankeOrderDetailsService} from '@core/services/franke-order-details/franke-order-details.service';
import {UserAccountFacade} from '@spartacus/user/account/root';

@Component({
  selector: 'app-order-details-invoices',
  templateUrl: './order-details-invoices.component.html',
  styleUrls: ['./order-details-invoices.component.scss'],
  providers: [FrankeOrderDetailsInvoicesService, DecimalPipe],
})
export class OrderDetailsInvoicesComponent {
  total$: Observable<number>;
  orderInvoices$: Observable<FrankeOrderInvoices[]>;
  userUID: string;
  orderNumber$: Observable<string>;
  currentOrderCode: string;

  invoicesListLoaded$: Observable<boolean>;
  hasInvoices$: Observable<boolean>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public frankeOrderDetailsService: FrankeOrderDetailsService,
    public service: FrankeOrderDetailsInvoicesService,
    protected endpointService: OccEndpointsService,
    private userAccountFacade: UserAccountFacade,
    private windowStorageService: WindowStorageService,
    private http: HttpClient
  ) {
    this.orderNumber$ = frankeOrderDetailsService.orderNumber$;
    this.orderInvoices$ = service.orderInvoices$;
    this.total$ = service.total$;

    this.invoicesListLoaded$ = service.invoicesListLoaded$;
    this.hasInvoices$ = service.hasInvoices$;

    this.orderNumber$
      .subscribe((orderCode) => {
        if (orderCode) {
          this.currentOrderCode = orderCode;
        }
      })
      .unsubscribe();

    this.userAccountFacade.get().subscribe((user) => {
      this.userUID = user.uid;
    });
  }

  onSort({column, direction}: SortEvent): void {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  getPDF(invoiceNumber: string): void {
    const token = this.windowStorageService.getItemFromLocalStorage(
      'access_token'
    );

    const url = this.endpointService.buildUrl(
      `/users/${this.userUID}/invoices/${invoiceNumber}`
    );

    this.http
      .get(url, {
        responseType: 'blob',
        headers: {Authorization: `Bearer ${token}`},
      })
      .pipe(
        map((x) =>
          window
            .open(
              window.URL.createObjectURL(
                new Blob([x], {type: 'application/pdf'})
              )
            )
            .focus()
        )
      )
      .subscribe();
  }
}
