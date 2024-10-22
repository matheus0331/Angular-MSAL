import {TestBed} from '@angular/core/testing';

import {WindowStorageService} from './window-storage.service';

describe('WindowStorageService', () => {
  let service: WindowStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
