import {Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PaginationBuilder, PaginationComponent, PaginationItem, PaginationItemType} from '@spartacus/storefront';

import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';

@Component({
  selector: 'app-products-pagination',
  templateUrl: './products-pagination.component.html',
  styleUrls: ['./products-pagination.component.scss'],
  providers: [WindowSizeUtils],
})
export class ProductsPaginationComponent extends PaginationComponent {
  @Output() viewPageEvent: EventEmitter<number> = new EventEmitter<number>();

  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);

  constructor(
    paginationBuilder: PaginationBuilder,
    activatedRoute: ActivatedRoute,
    public myActivatedRoute: ActivatedRoute,
    protected windowSizeUtils: WindowSizeUtils
  ) {
    super(paginationBuilder, activatedRoute);
  }

  prevOrNextPage(pageNumber: number): void {
    const item: PaginationItem = {
      number: pageNumber,
      label: String(
        pageNumber > this.pagination.currentPage
          ? pageNumber + 1
          : pageNumber - 1
      ),
      type: PaginationItemType.PAGE,
    };
    this.viewPageEvent.emit(item.number);
  }

  getParams(pageNumber: number): Params {
    const item: PaginationItem = {
      number: pageNumber,
      label: String(
        pageNumber > this.pagination.currentPage
          ? pageNumber + 1
          : pageNumber - 1
      ),
      type: PaginationItemType.PAGE,
    };
    const queryParams = Object.assign(
      {},
      this.myActivatedRoute.snapshot.queryParams
    );
    if (
      this.queryParam &&
      item.number < this.pagination.totalPages &&
      !this.isCurrent(item)
    ) {
      queryParams[this.queryParam] = item.number;
    }
    // omit the page number from the query parameters in case it's the default
    // to clean up the experience and avoid unnecessary polluting of the URL
    if (queryParams[this.queryParam] === this.defaultPage) {
      delete queryParams[this.queryParam];
    }
    return queryParams;
  }
}
