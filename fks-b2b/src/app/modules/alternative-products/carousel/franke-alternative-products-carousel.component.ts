import {AfterViewInit, Component, ContentChild, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {WindowRef} from '@spartacus/core';
import {Observable} from 'rxjs';
import {CarouselComponent, CarouselService} from '@spartacus/storefront';
import {AlternativeProduct, AlternativeProductFacet} from '@shared/models/alternative-products';
import {FrankeAlternativeProductsService} from '@core/services/franke-alternative-products/franke-alternative-products.service';

@Component({
  selector: 'app-franke-alternative-products-carousel',
  templateUrl: './franke-alternative-products-carousel.component.html',
  styleUrls: ['./franke-alternative-products-carousel.component.scss'],
})
export class FrankeAlternativeProductsCarouselComponent
  extends CarouselComponent
  implements OnInit, AfterViewInit {
  @Input() products: AlternativeProduct[];
  @Input() facets: AlternativeProductFacet[];
  @Input() imageHeight = '100px';
  @Input() showCharaCharacteristics: boolean;
  @Input() containerMaxWidth = '800px';
  @Input() itemWidth = '200px';
  @Input() actionButtonLabel = '';
  maxItemWidth = `calc(${this.itemWidth} - 50px)`;

  @ViewChild('frankeAlternativeProductsCarousel') carousel: ElementRef;

  @ContentChild('alternativeProductsCarouselAction', {static: false})
  alternativeProductsCarouselActionTemplateRef: TemplateRef<any>;

  facetsFilters: AlternativeProductFacet[];

  constructor(
    el: ElementRef,
    service: CarouselService,
    private winRef: WindowRef,
    protected frankeAlternativeProductsService: FrankeAlternativeProductsService
  ) {
    super(el, service);
  }

  ngOnInit(): void {
    this.setFacets();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.size$ = this.getItemsPerSlide(this.itemWidth).pipe(
        tap(() => (this.activeSlide = 0))
      );
    }, 0);
  }

  setFacets(): void {
    if (this.facets) {
      this.facetsFilters = this.frankeAlternativeProductsService.filterFacetsWithoutHidden(
        this.facets
      );
    }
  }

  getItemsPerSlide(itemWidth: string): Observable<number> {
    return this.winRef.resize$.pipe(
      map(
        () =>
          this.carousel?.nativeElement?.offsetWidth || this.containerMaxWidth
      ),
      map((totalWidth) => this.calculateItems(totalWidth, itemWidth))
    );
  }

  private calculateItems(availableWidth: number, itemWidth: string): number {
    let calculatedItems = 0;

    if (itemWidth.endsWith('px')) {
      const num = itemWidth.substring(0, itemWidth.length - 2);
      calculatedItems = availableWidth / Number(num);
    }

    if (itemWidth.endsWith('%')) {
      const perc = itemWidth.substring(0, itemWidth.length - 1);
      calculatedItems = availableWidth / (availableWidth * Number(perc));
    }

    return Math.floor(calculatedItems) || 1;
  }
}
