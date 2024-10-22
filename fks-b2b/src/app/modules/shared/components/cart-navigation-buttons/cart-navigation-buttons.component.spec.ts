import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CartNavigationButtonsComponent} from './cart-navigation-buttons.component';

describe('CartNavigationButtonsComponent', () => {
  let component: CartNavigationButtonsComponent;
  let fixture: ComponentFixture<CartNavigationButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartNavigationButtonsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartNavigationButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
