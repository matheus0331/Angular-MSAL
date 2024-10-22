import {TestBed} from '@angular/core/testing';

import {FrankeOrderNotificationService} from './franke-order-notification.service';

describe('FrankeOrderNotificationService', () => {
  let service: FrankeOrderNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeOrderNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
