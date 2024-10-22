import {TestBed} from '@angular/core/testing';

import {FrankeOrderDetailsService} from './franke-order-details.service';

describe('FrankeOrderDetailsService', () => {
  let service: FrankeOrderDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeOrderDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
