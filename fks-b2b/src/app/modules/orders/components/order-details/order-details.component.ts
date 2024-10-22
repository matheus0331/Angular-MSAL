import {Component, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {NgbdSortableHeader, SortEvent} from '../sortableDetails.directive';
import {FrankeOrderDetailsService} from 'src/app/core/services/franke-order-details/franke-order-details.service';
import {FrankeOrderDetails} from 'src/app/shared/models/franke-order';
import {WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  total$: Observable<number>;
  orderDetails$: Observable<FrankeOrderDetails[]>;
  model: NgbDateStruct;
  loading$: Observable<boolean>;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public service: FrankeOrderDetailsService,
    protected windowSizeUtils: WindowSizeUtils
  ) {
    this.loading$ = this.service.loading$;
    this.orderDetails$ = this.service.orderDetails$;
    this.total$ = this.service.total$;
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
}
