import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FacetsActiveFiltersComponent} from './facets-active-filters.component';

describe('FacetsActiveFiltersComponent', () => {
  let component: FacetsActiveFiltersComponent;
  let fixture: ComponentFixture<FacetsActiveFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacetsActiveFiltersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetsActiveFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
