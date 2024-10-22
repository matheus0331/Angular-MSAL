import {Component} from '@angular/core';
import {NgbPagination, NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import {WindowRef} from '@spartacus/core';
import {WindowMoveUtils} from 'src/app/shared/utils/window-move-utils';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';

@Component({
  selector: 'app-orders-pagination',
  templateUrl: './orders-pagination.component.html',
  styleUrls: ['./orders-pagination.component.scss'],
  providers: [WindowSizeUtils, WindowMoveUtils],
})
export class OrdersPaginationComponent extends NgbPagination {
  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);

  constructor(
    config: NgbPaginationConfig,
    protected windowSizeUtils: WindowSizeUtils,
    protected windowMoveUtils: WindowMoveUtils,
    protected winRef: WindowRef
  ) {
    super(config);
  }

  changePage(pageNumber: number, event: any): void {
    this.selectPage(pageNumber);
    this.windowMoveUtils.goToTop();
    event.preventDefault();
  }
}
