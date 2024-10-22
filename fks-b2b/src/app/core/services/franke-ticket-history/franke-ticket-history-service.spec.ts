import {TestBed} from '@angular/core/testing';
import {FrankeTicketHistoryService} from './franke-ticket-history.service';

describe('FrankeTicketHistoryService', () => {
  let service: FrankeTicketHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrankeTicketHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
