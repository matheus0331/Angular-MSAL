import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrankeSearchResultsComponent } from './franke-search-results.component';

describe('FrankeSearchResultsComponent', () => {
  let component: FrankeSearchResultsComponent;
  let fixture: ComponentFixture<FrankeSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrankeSearchResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrankeSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
