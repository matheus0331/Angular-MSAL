import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductsGridItemComponent} from './products-grid-item.component';

describe('ProductsGridItemComponent', () => {
  let component: ProductsGridItemComponent;
  let fixture: ComponentFixture<ProductsGridItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsGridItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
