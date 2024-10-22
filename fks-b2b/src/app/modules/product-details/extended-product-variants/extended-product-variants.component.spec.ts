import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtendedProductVariantsComponent} from './extended-product-variants.component';

describe('ExtendedProductVariantsComponent', () => {
  let component: ExtendedProductVariantsComponent;
  let fixture: ComponentFixture<ExtendedProductVariantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedProductVariantsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedProductVariantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
