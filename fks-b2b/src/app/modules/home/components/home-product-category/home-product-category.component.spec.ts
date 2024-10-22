import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeProductCategoryComponent} from './home-product-category.component';

describe('HomeProductCategoryComponent', () => {
  let component: HomeProductCategoryComponent;
  let fixture: ComponentFixture<HomeProductCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeProductCategoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
