import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtendedAddToCartComponent} from './extended-add-to-cart.component';

describe('ExtendedAddToCartComponent', () => {
  let component: ExtendedAddToCartComponent;
  let fixture: ComponentFixture<ExtendedAddToCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedAddToCartComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedAddToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
