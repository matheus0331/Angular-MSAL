import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';

export enum MediaBreakpoint {
  MOBILE = '(max-width: 767px)',
  TABLET = '(min-width: 768px) and (max-width: 991px)',
  DESKTOP = '(min-width: 992px)',
  TABLET_OR_DESKTOP = '(min-width: 768px)',
  MOBILE_OR_TABLET = '(max-width: 991px)',
  XS = '(max-width: 375px)',
  S = '(min-width: 576px) and (max-width: 767px)',
  M = '(min-width: 768px) and (max-width: 991px)',
  L = '(min-width: 992px) and (max-width: 1199px)',
  XL = '(min-width: 1200px)',
  LANDSCAPE = '(orientation: landscape)',
  PORTRAIT = '(orientation: portrait)',
}

@Injectable({
  providedIn: 'root',
})
export class WindowSizeUtils {
  constructor(private windowRef: WindowRef) {}

  match(breakpoint: MediaBreakpoint): Observable<boolean> {
    return new Observable((observer) => {
      const mediaQuery: MediaQueryList = this.windowRef.nativeWindow?.matchMedia(
        breakpoint
      );

      // SSR
      if (!mediaQuery) {
        return;
      }

      observer.next(mediaQuery.matches);
      const eventListener = (event) => {
        observer.next(event.matches);
      };
      mediaQuery.addEventListener('change', eventListener);

      return () => {
        mediaQuery.removeEventListener('change', eventListener);
      };
    });
  }
}
