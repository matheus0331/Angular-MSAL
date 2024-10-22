import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';

@Injectable()
export class WindowMoveUtils {
  constructor(private windowRef: WindowRef) {}

  goToTop(): void {
    this.goTo(0, 0);
  }

  goTo(positionX: number = 0, positionY: number = 0): void {
    this.windowRef.nativeWindow.scrollTo(positionX, positionY);
  }
}
