import {TestBed} from '@angular/core/testing';

import {ExtendedProductVariantGuard} from './extended-product-variant.guard';

describe('ExtendedProductVariantGuard', () => {
  let guard: ExtendedProductVariantGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExtendedProductVariantGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
