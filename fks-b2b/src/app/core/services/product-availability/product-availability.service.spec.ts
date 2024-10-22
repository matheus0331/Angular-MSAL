import {TestBed} from '@angular/core/testing';

import {ProductAvailabilityService} from './product-availability.service';

describe('ProductAvailabilityService', () => {
  let service: ProductAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
