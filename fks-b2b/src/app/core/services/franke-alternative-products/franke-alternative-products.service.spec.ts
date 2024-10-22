import {TestBed} from '@angular/core/testing';

import {FrankeAlternativeProductsService} from './franke-alternative-products.service';

describe('FrankeAlternativeProductsService', () => {
  let service: FrankeAlternativeProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeAlternativeProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
