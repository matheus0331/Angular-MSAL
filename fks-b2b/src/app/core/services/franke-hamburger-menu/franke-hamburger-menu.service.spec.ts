import {TestBed} from '@angular/core/testing';

import {FrankeHamburgerMenuService} from './franke-hamburger-menu.service';

describe('FrankeHamburgerMenuService', () => {
  let service: FrankeHamburgerMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeHamburgerMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
