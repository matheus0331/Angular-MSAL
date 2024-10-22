import {TestBed} from '@angular/core/testing';

import {AddToCartFeedbackService} from './add-to-cart-feedback.service';

describe('AddToCartFeedbackService', () => {
  let service: AddToCartFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToCartFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
