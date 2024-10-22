import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FrankeReviewOrderComponent} from './franke-review-order.component';

describe('FrankeReviewOrderComponent', () => {
  let component: FrankeReviewOrderComponent;
  let fixture: ComponentFixture<FrankeReviewOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrankeReviewOrderComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrankeReviewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
