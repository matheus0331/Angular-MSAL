import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductsPaginationComponent} from './products-pagination.component';

describe('ProductsPaginationComponent', () => {
  let component: ProductsPaginationComponent;
  let fixture: ComponentFixture<ProductsPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsPaginationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
