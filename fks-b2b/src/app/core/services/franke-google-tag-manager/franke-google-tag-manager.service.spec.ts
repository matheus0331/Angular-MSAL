import {TestBed} from '@angular/core/testing';

import {FrankeGoogleTagManagerService} from './franke-google-tag-manager.service';

describe('FrankeGoogleTagManagerService', () => {
  let service: FrankeGoogleTagManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeGoogleTagManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
