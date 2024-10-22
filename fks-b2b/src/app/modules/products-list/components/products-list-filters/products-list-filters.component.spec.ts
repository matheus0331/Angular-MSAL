import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductsListFiltersComponent} from './products-list-filters.component';

describe('ProductsListFiltersComponent', () => {
  let component: ProductsListFiltersComponent;
  let fixture: ComponentFixture<ProductsListFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsListFiltersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
