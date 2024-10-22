import {TestBed} from '@angular/core/testing';

import {FrankeCurrentProductService} from './franke-current-product-service';

describe('FrankeCurrentProductService', () => {
  let service: FrankeCurrentProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeCurrentProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
