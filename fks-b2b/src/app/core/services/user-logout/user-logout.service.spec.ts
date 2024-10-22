import {TestBed} from '@angular/core/testing';

import {UserLogoutService} from './user-logout.service';

describe('UserLogoutService', () => {
  let service: UserLogoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLogoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
