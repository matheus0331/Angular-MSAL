import {DecimalPipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component, QueryList, ViewChildren} from '@angular/core';
import {OccEndpointsService} from '@spartacus/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {FrankeOrderInvoicesService} from 'src/app/core/services/franke-order-invoices/franke-order-invoices.service';
import {WindowStorageService} from 'src/app/core/services/window-storage/window-storage.service';
import {FrankeOrderInvoices} from 'src/app/shared/models/franke-order';
import {NgbdSortableHeader, SortEvent} from '../sortable.directive';
import {UserAccountFacade} from '@spartacus/user/account/root';

@Component({
  selector: 'app-order-invoices',
  templateUrl: './order-invoices.component.html',
  styleUrls: ['./order-invoices.component.scss'],
  providers: [FrankeOrderInvoicesService, DecimalPipe],
})
export class OrderInvoicesComponent {
  total$: Observable<number>;
  orderInvoices$: Observable<FrankeOrderInvoices[]>;
  userUID: string;

  invoicesListLoaded$: Observable<boolean>;
  hasInvoices$: Observable<boolean>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public service: FrankeOrderInvoicesService,
    protected endpointService: OccEndpointsService,
    private userAccountFacade: UserAccountFacade,
    private windowStorageService: WindowStorageService,
    private http: HttpClient
  ) {
    this.orderInvoices$ = service.orderInvoices$;
    this.total$ = service.total$;

    this.invoicesListLoaded$ = service.invoicesListLoaded$;
    this.hasInvoices$ = service.hasInvoices$;

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
