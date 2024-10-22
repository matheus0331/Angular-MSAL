import {TestBed} from '@angular/core/testing';

import {FrankeOrderDetailsInvoicesService} from './franke-order-details-invoices.service';

describe('FrankeOrderInvoicesService', () => {
  let service: FrankeOrderDetailsInvoicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeOrderDetailsInvoicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
