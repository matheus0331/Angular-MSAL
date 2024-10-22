import {Injectable} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {WindowRef} from '@spartacus/core';
import {BehaviorSubject} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FrankeHamburgerMenuService {
  isExpanded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isOpen = false;

  constructor(router: Router, private windowRef: WindowRef) {
    router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this.isOpen = false;
        this.windowRef.document.getElementsByTagName('body')[0].style.overflow =
          'scroll';
        this.toggle(true);
      });
  }

  /**
   * toggles the expand state of the hamburger menu
   */
  toggle(forceCollapse?: boolean): void {
    if (forceCollapse) {
      this.isExpanded.next(false);
    } else {
      this.isOpen = !this.isOpen;
      this.isOpen
        ? (this.windowRef.document.getElementsByTagName(
          'body'
        )[0].style.overflow = 'hidden')
        : (this.windowRef.document.getElementsByTagName(
          'body'
        )[0].style.overflow = 'scroll');

      this.isExpanded.next(!this.isExpanded.value);
    }
  }
}
