import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {EventService, Product, TranslationService, WindowRef} from '@spartacus/core';
import {CurrentProductService, ProductIntroComponent} from '@spartacus/storefront';
import {SubstituteProductsService} from 'src/app/core/services/substitute-products/substitute-products.service';
import {EventsTrackerService} from 'src/app/core/services/events-tracker/events-tracker.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-custom-product-intro',
  templateUrl: './custom-product-intro.component.html',
  styleUrls: ['./custom-product-intro.component.scss'],
})
export class CustomProductIntroComponent
  extends ProductIntroComponent
  implements OnInit {
  substituteProducts$: Observable<boolean> = this.substituteProductsService.substituteProducts$.asObservable();
  product$: Observable<Product>;

  constructor(
    currentProductService: CurrentProductService,
    translationService: TranslationService,
    winRef: WindowRef,
    private substituteProductsService: SubstituteProductsService,
    private eventsTrackerService: EventsTrackerService,
    protected eventService: EventService,
  ) {
    super(currentProductService, translationService, winRef, eventService);
  }

  ngOnInit(): void {
    this.subscribeToProductChanges();
  }

  subscribeToProductChanges(): void {
    this.product$.pipe(take(1)).subscribe((product: Product) => {
      this.sendProductImpressionEvent(product);
    });
  }

  sendProductImpressionEvent(product: Product): void {
    this.eventsTrackerService.sendProductDetailImpressionEvent(product);
  }

  scrollToSubstituteProducts(): void {
    this.winRef.document
      .getElementById('reference')
      .scrollIntoView({behavior: 'smooth'});
  }
}
