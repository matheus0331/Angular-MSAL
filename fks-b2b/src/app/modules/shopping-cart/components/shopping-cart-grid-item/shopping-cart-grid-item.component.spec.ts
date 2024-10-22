import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShoppingCartGridItemComponent} from './shopping-cart-grid-item.component';

describe('ShoppingCartGridItemComponent', () => {
  let component: ShoppingCartGridItemComponent;
  let fixture: ComponentFixture<ShoppingCartGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingCartGridItemComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
