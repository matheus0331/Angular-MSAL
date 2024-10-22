import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonAddToCartComponent} from './button-add-to-cart.component';

describe('ButtonAddToCartComponent', () => {
  let component: ButtonAddToCartComponent;
  let fixture: ComponentFixture<ButtonAddToCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonAddToCartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAddToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
