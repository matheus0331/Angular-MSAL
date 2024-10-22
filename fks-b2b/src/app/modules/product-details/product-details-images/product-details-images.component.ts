import {Component} from '@angular/core';
import {Product, WindowRef} from '@spartacus/core';
import {CurrentProductService} from '@spartacus/storefront';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {distinctUntilChanged, filter, map, tap} from 'rxjs/operators';

import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';

@Component({
  selector: 'app-product-details-images',
  templateUrl: './product-details-images.component.html',
  styleUrls: ['./product-details-images.component.scss'],
  providers: [WindowSizeUtils],
})
export class ProductDetailsImagesComponent {
  isDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.DESKTOP);

  currentImageSelected: any;
  imageWrapper: any;
  image: any;
  mainMediaContainer = new BehaviorSubject(null);
  productImgPlaceholder =
    '../../../../../assets/imgs/productImgPlaceholder.jpeg';
  private product$: Observable<Product> = this.currentProductService
    .getProduct()
    .pipe(
      filter(isNotNullable),
      distinctUntilChanged(),
      tap((p: Product) => {
        this.mainMediaContainer.next(
          p.images?.PRIMARY
            ? p.images.PRIMARY
            : p.images.GALLERY
              ? p.images.GALLERY[1]
              : {}
        );
      })
    );
  thumbs$: Observable<any[]> = this.product$.pipe(
    map((p: Product) => this.createThumbs(p))
  );

  constructor(
    protected winRef: WindowRef,
    protected windowSizeUtils: WindowSizeUtils,
    private currentProductService: CurrentProductService
  ) {
  }

  selectedImage(event: Event): void {
    if (!this.currentImageSelected) {
      this.currentImageSelected = event.target;
      this.addCurrentSelectedClass(this.currentImageSelected);
    } else {
      this.removeCurrentSelectedClass(this.currentImageSelected);
      this.currentImageSelected = event.target;
      this.addCurrentSelectedClass(this.currentImageSelected);
    }
  }

  addCurrentSelectedClass(img: Element): void {
    img.classList.add('current-selected');
  }

  removeCurrentSelectedClass(img: Element): void {
    img.classList.remove('current-selected');
  }

  imageMouseOver(): void {
    this.imageWrapper = this.winRef.document.getElementsByClassName(
      'main-image-wrapper'
    )[0];
    this.image = this.winRef.document.getElementsByClassName('main-image')[0];
  }

  imageMouseOut(): void {
    this.image.setAttribute('style', 'transform: scale(1)');
  }

  imageMouseMove(event): void {
    this.image.setAttribute(
      'style',
      `transform: scale(2); transform-origin: ${
        ((event.pageX - this.imageWrapper.offsetLeft) /
          this.imageWrapper.offsetWidth) *
        100
      }% ${
        ((event.pageY - this.imageWrapper.offsetTop) /
          this.imageWrapper.offsetHeight) *
        100
      }%`
    );
  }

  openImage(item: any): void {
    this.mainMediaContainer.next(item);
  }

  isActive(thumbnail): Observable<boolean> {
    return this.mainMediaContainer.pipe(
      filter(Boolean),
      map((container: any) => {
        return (
          container.zoom &&
          container.zoom.url &&
          thumbnail.zoom &&
          thumbnail.zoom.url &&
          container.zoom.url === thumbnail.zoom.url
        );
      })
    );
  }

  /** find the index of the main media in the list of media */
  getActive(thumbs: any[]): Observable<number> {
    return this.mainMediaContainer.pipe(
      filter(Boolean),
      map((container: any) => {
        const current = thumbs.find(
          (t) =>
            t.media &&
            container.zoom &&
            t.media.container &&
            t.media.container.zoom &&
            t.media.container.zoom.url === container.zoom.url
        );
        return thumbs.indexOf(current);
      })
    );
  }

  /**
   * Return an array of CarouselItems for the product thumbnails.
   * In case there are less then 2 thumbs, we return null.
   */
  private createThumbs(product: Product): Observable<any>[] {
    if (
      !product.images ||
      !product.images.GALLERY ||
      !(product.images.GALLERY instanceof Array) ||
      product.images.GALLERY.length < 2
    ) {
      return [];
    }
    const thumbs = (product.images.GALLERY as any[]).filter((n) => n && n['product']).map((c) => of({container: c}));
    return thumbs;
  }
}

export function isNotUndefined<T>(value: T | undefined): value is T {
  return typeof value !== 'undefined';
}

export function isNotNullable<T>(value: T): value is NonNullable<T> {
  return isNotUndefined(value) && value !== null;
}
