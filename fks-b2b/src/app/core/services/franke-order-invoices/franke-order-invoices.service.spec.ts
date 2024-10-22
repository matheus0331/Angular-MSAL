import {TestBed} from '@angular/core/testing';

import {FrankeOrderInvoicesService} from './franke-order-invoices.service';

describe('FrankeOrderInvoicesService', () => {
  let service: FrankeOrderInvoicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeOrderInvoicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
