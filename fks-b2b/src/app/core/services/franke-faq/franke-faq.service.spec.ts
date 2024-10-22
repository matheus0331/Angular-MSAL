import {TestBed} from '@angular/core/testing';

import {FrankeFaqService} from './franke-faq.service';

describe('FrankeFaqService', () => {
  let service: FrankeFaqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeFaqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
