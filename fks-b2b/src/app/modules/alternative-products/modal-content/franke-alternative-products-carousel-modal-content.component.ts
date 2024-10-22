import {Component, ContentChild, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ICON_TYPE, LaunchDialogService} from '@spartacus/storefront';
import {AlternativeProduct, AlternativeProductFacet, AlternativeProductSearchData} from '@shared/models/alternative-products';
import {FrankeAlternativeProductsService} from '@core/services/franke-alternative-products/franke-alternative-products.service';
import {TranslationService} from '@spartacus/core';

@Component({
  selector: 'app-franke-alternative-products-carousel-modal-content',
  templateUrl:
    './franke-alternative-products-carousel-modal-content.component.html',
  styleUrls: [
    './franke-alternative-products-carousel-modal-content.component.scss',
  ],
})
export class FrankeAlternativeProductsCarouselModalContentComponent
  implements OnInit, OnDestroy {
  @Input() requestDate: Date = new Date();
  @Input() quantity = 1;

  @Output() actionClick = new EventEmitter<AlternativeProduct>();
  @Output() productClick = new EventEmitter<AlternativeProduct>();

  alternativeProductSearchData$ = this.frankeAlternativeProductsService
    .alternativeProductSearchData$;
  data: AlternativeProductSearchData;
  productCode: string;
  actionButtonLabel: string;
  actionButtonAction;
  ref;
  actionButtonLabelStr: string;
  dialog: ElementRef;
  iconTypes = ICON_TYPE;
  destroyed$ = new Subject<boolean>();
  @ViewChild('element') element: ElementRef;

  @ContentChild('alternativeProductsCarouselAction', {static: false})
  alternativeProductsCarouselActionTemplateRef: TemplateRef<any>;

  constructor(
    private frankeAlternativeProductsService: FrankeAlternativeProductsService,
    protected launchDialogService: LaunchDialogService,
    protected translation: TranslationService
  ) {
  }

  ngOnInit(): void {
    this.handleProductClick();
    this.handleActionClick();
    this.handleProductsChange();
    this.handleFacetsChange();
    this.launchDialogService.data$.subscribe((data) => {
        this.productCode = data.productCode;
        this.actionButtonLabel = data.actionButtonLabel;
        this.actionButtonAction = data.actionButtonAction;
        this.ref = data.ref;
      }
    );
    this.translation.translate(this.actionButtonLabel)
      .subscribe((label) => {
        this.actionButtonLabelStr = label;
      });
    this.searchProducts();
  }

  // Should there be a custom action for the cart?
  handleActionClick(): void {
    this.frankeAlternativeProductsService.actionClick$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((product: AlternativeProduct) => {
        if (this.actionButtonAction) {
          this.actionButtonAction.call(this.ref, product);
          this.dismissModal('Go To Product');
          return;
        }
        this.actionClick.emit(product);
        this.dismissModal('Go To Product');
        this.frankeAlternativeProductsService.goToProduct(product.FUN);
      });
  }

  handleProductClick(): void {
    this.frankeAlternativeProductsService.productClick$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((product: AlternativeProduct) => {
        this.productClick.emit(product);
        this.dismissModal('Go To Product');
        this.frankeAlternativeProductsService.goToProduct(product.FUN);
      });
  }

  handleProductsChange(): void {
    this.alternativeProductSearchData$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: AlternativeProductSearchData) => {
        this.data = data;
        if (data.error) {
          this.dismissModal();
        }
      });
  }

  handleFacetsChange(): void {
    this.frankeAlternativeProductsService.facetChange$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((facet: AlternativeProductFacet) => {
        this.searchProducts(facet.addQuery || facet.removeQuery);
      });
  }

  searchProducts(query: string = ''): void {
    return this.frankeAlternativeProductsService.searchAlternativeProducts({
      fun: this.productCode,
      requestDate: this.requestDate,
      quantity: this.quantity,
      query,
    });
  }

  dismissModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.frankeAlternativeProductsService.dropGetAlternativeProductsRequest();
  }
}
