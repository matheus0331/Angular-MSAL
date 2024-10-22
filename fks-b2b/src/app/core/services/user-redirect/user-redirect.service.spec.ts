import {TestBed} from '@angular/core/testing';

import {UserRedirectService} from './user-redirect.service';

describe('UserRedirectService', () => {
  let service: UserRedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
