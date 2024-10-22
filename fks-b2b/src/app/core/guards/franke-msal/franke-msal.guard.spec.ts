import {TestBed} from '@angular/core/testing';

import {FrankeMsalGuard} from './franke-msal.guard';

describe('FrankeMsalGuard', () => {
  let guard: FrankeMsalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FrankeMsalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
