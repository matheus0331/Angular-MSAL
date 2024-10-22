import {TestBed} from '@angular/core/testing';

import {FrankeNavigationNodeService} from './franke-navigation-node.service';

describe('CustomNavigationNodeService', () => {
  let service: FrankeNavigationNodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeNavigationNodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
