import {TestBed} from '@angular/core/testing';

import {BrandsInterceptor} from './brands.interceptor';

describe('BrandsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BrandsInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: BrandsInterceptor = TestBed.inject(BrandsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
