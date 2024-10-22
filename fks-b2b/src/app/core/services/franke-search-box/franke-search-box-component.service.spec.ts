import {TestBed} from '@angular/core/testing';

import {FrankeSearchBoxComponentService} from './franke-search-box-component.service';

describe('FrankeSearchBoxComponentService', () => {
  let service: FrankeSearchBoxComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeSearchBoxComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
