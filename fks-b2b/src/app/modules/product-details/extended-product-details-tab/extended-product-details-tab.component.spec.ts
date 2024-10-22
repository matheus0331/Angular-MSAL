import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtendedProductDetailsTabComponent} from './extended-product-details-tab.component';

describe('ExtendedProductDetailsTabComponent', () => {
  let component: ExtendedProductDetailsTabComponent;
  let fixture: ComponentFixture<ExtendedProductDetailsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedProductDetailsTabComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedProductDetailsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
