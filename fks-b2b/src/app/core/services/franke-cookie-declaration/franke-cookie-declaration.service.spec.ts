import {TestBed} from '@angular/core/testing';

import {FrankeCookieDeclarationService} from './franke-cookie-declaration.service';

describe('FrankeCookieDeclarationService', () => {
  let service: FrankeCookieDeclarationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeCookieDeclarationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
