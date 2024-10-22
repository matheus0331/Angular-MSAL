import {Component, ElementRef} from '@angular/core';
import {ProductViewComponent} from '@spartacus/storefront';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';

@Component({
  selector: 'app-button-change-view-mode',
  templateUrl: './button-change-view-mode.component.html',
  styleUrls: ['./button-change-view-mode.component.scss'],
  providers: [WindowSizeUtils],
})
export class ButtonChangeViewModeComponent extends ProductViewComponent {
  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);

  constructor(
    protected elementRef: ElementRef<HTMLElement>,
    protected windowSizeUtils: WindowSizeUtils
  ) {
    super();
  }

  changeView(): void {
    const gridView = this.elementRef.nativeElement.getElementsByClassName(
      'grid-view'
    )[0];
    const listView = this.elementRef.nativeElement.getElementsByClassName(
      'list-view'
    )[0];

    if (this.mode === 'grid') {
      gridView.classList.remove('view-enabled');
      gridView.classList.add('view-disabled');

      listView.classList.remove('view-disabled');
      listView.classList.add('view-enabled');
    } else if (this.mode === 'list') {
      gridView.classList.remove('view-disabled');
      gridView.classList.add('view-enabled');

      listView.classList.remove('view-enabled');
      listView.classList.add('view-disabled');
    }
  }
}
