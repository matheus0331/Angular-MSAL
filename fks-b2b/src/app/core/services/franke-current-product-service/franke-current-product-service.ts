import {Injectable} from '@angular/core';
import {RoutingService} from '@spartacus/core';
import {Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FrankeCurrentProductService {
  constructor(private routingService: RoutingService) {
  }

  getProductCode(): Observable<string | null> {
    return this.routingService
      .getRouterState()
      .pipe(
        map(
          (state) => state.state.params['productCode'],
          distinctUntilChanged()
        )
      );
  }
}
