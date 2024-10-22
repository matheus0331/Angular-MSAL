import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BrandsService} from '../../services/brands/brands.service';

@Injectable()
export class BrandsInterceptor implements HttpInterceptor {
  constructor(protected brandsService: BrandsService) {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.brandsService.getCurrentBrand()) {
      let newParams = new HttpParams({fromString: request.params.toString()});

      newParams = newParams.append(
        'currentBrand',
        this.brandsService.getCurrentBrand()
      );

      const requestClone = request.clone({
        params: newParams,
      });

      return next.handle(requestClone);
    }

    return next.handle(request);
  }
}
