import {TestBed} from '@angular/core/testing';

import {FrankeOrderDeliveriesService} from './franke-order-deliveries.service';

describe('FrankeOrderDeliveriesService', () => {
  let service: FrankeOrderDeliveriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeOrderDeliveriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
