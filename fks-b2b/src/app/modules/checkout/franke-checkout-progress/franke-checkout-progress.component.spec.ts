import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FrankeCheckoutProgressComponent} from './franke-checkout-progress.component';

describe('FrankeCheckoutProgressComponent', () => {
  let component: FrankeCheckoutProgressComponent;
  let fixture: ComponentFixture<FrankeCheckoutProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrankeCheckoutProgressComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrankeCheckoutProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
