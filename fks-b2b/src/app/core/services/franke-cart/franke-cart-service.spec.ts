import {TestBed} from '@angular/core/testing';
import {FrankeCartService} from './franke-cart.service';

describe('FrankeCartService', () => {
  let service: FrankeCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
