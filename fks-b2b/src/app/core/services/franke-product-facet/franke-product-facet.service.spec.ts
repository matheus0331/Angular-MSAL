import {TestBed} from '@angular/core/testing';

import {FrankeProductFacetService} from './franke-product-facet.service';

describe('FrankeProductFacetService', () => {
  let service: FrankeProductFacetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeProductFacetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
