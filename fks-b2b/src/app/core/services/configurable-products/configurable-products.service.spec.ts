import {TestBed} from '@angular/core/testing';

import {ConfigurableProductsService} from './configurable-products.service';

describe('ConfigurableProductsService', () => {
  let service: ConfigurableProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurableProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
