import {EventsTrackerService} from 'src/app/core/services/events-tracker/events-tracker.service';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {MiniCartComponent, MiniCartComponentService} from '@spartacus/cart/base/components/mini-cart';
import {ActiveCartFacade, Cart} from '@spartacus/cart/base/root';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-minicart',
  templateUrl: './minicart.component.html',
  styleUrls: ['./minicart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MiniCartComponent],
})
export class MinicartComponent extends MiniCartComponent {
  activeCartFacade: ActiveCartFacade;
  cart$: Observable<Cart>;

  constructor(
    protected eventsTrackerService: EventsTrackerService,
    protected miniCartComponentService: MiniCartComponentService,
    activeCartFacade: ActiveCartFacade
  ) {
    super(miniCartComponentService);
    this.activeCartFacade = activeCartFacade;
    this.cart$ = activeCartFacade.getActive();
    this.quantity$ = this.activeCartFacade.getActive().pipe(
      startWith({totalUnitCount: 0}),
      map((cart2) => cart2.totalUnitCount || 0)
    );
  }
}
