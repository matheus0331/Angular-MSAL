import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FrankeAlternativeProductsFacetsComponent} from './franke-alternative-products-facets.component';

describe('FrankeAlternativeProductsFacetsComponent', () => {
  let component: FrankeAlternativeProductsFacetsComponent;
  let fixture: ComponentFixture<FrankeAlternativeProductsFacetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FrankeAlternativeProductsFacetsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrankeAlternativeProductsFacetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
