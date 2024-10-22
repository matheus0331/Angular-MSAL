import {TestBed} from '@angular/core/testing';

import {DownloadProductDocumentsService} from './download-product-documents.service';

describe('DownloadProductDocumentsService', () => {
  let service: DownloadProductDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadProductDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
