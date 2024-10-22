import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonSortProductsComponent} from './button-sort-products.component';

describe('ButtonSortProductsComponent', () => {
  let component: ButtonSortProductsComponent;
  let fixture: ComponentFixture<ButtonSortProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonSortProductsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonSortProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
