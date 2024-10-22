import {TestBed} from '@angular/core/testing';

import {FrankeOrderHistoryService} from './franke-order-history.service';

describe('FrankeOrderHistoryService', () => {
  let service: FrankeOrderHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeOrderHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
