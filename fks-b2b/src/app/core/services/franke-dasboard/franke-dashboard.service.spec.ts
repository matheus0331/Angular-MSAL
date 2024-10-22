import {TestBed} from '@angular/core/testing';

import {FrankeDashboardService} from './franke-dashboard.service';

describe('FrankeDashboardService', () => {
  let service: FrankeDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
