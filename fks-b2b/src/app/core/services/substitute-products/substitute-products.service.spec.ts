import {TestBed} from '@angular/core/testing';

import {SubstituteProductsService} from './substitute-products.service';

describe('SubstituteProductsService', () => {
  let service: SubstituteProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubstituteProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
