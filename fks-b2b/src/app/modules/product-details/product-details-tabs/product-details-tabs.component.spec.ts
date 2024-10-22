import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductDetailsTabsComponent} from './product-details-tabs.component';

describe('ProductDetailsTabsComponent', () => {
  let component: ProductDetailsTabsComponent;
  let fixture: ComponentFixture<ProductDetailsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailsTabsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
