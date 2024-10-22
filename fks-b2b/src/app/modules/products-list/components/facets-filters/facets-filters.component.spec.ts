import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FacetsFiltersComponent} from './facets-filters.component';

describe('FacetsFiltersComponent', () => {
  let component: FacetsFiltersComponent;
  let fixture: ComponentFixture<FacetsFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacetsFiltersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
