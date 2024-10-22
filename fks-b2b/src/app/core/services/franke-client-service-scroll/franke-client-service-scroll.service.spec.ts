import {TestBed} from '@angular/core/testing';

import {FrankeClientServiceScrollService} from './franke-client-service-scroll.service';

describe('FrankeClientServiceScrollService', () => {
  let service: FrankeClientServiceScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeClientServiceScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
