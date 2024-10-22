import {TestBed} from '@angular/core/testing';

import {FrankeFacetService} from './franke-facet.service';

describe('FrankeFacetService', () => {
  let service: FrankeFacetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeFacetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
