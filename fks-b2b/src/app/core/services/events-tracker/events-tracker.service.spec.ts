import {TestBed} from '@angular/core/testing';

import {EventsTrackerService} from './events-tracker.service';

describe('EventsTrackerService', () => {
  let service: EventsTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
