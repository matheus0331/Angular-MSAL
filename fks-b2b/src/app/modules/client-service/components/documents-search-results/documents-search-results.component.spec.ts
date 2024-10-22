import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DocumentsSearchResultsComponent} from './documents-search-results.component';

describe('DocumentsSearchResultsComponent', () => {
  let component: DocumentsSearchResultsComponent;
  let fixture: ComponentFixture<DocumentsSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentsSearchResultsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
