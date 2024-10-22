import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FrankeProductReferencesComponent} from './franke-product-references.component';

describe('FrankeProductReferencesComponent', () => {
  let component: FrankeProductReferencesComponent;
  let fixture: ComponentFixture<FrankeProductReferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrankeProductReferencesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrankeProductReferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
