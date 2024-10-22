import {TestBed} from '@angular/core/testing';

import {FrankeProductListComponentService} from './franke-product-list-component.service';

describe('FrankeProductListComponentService', () => {
  let service: FrankeProductListComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeProductListComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
