import {TestBed} from '@angular/core/testing';

import {FrankeThemeService} from './franke-theme.service';

describe('FrankeThemeService', () => {
  let service: FrankeThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
