import {TestBed} from '@angular/core/testing';

import {ExtendedWishlistService} from './extended-wishlist.service';

describe('ExtendedWishlistService', () => {
  let service: ExtendedWishlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtendedWishlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
