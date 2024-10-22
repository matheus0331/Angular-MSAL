import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeProductCategoriesInspirationCmsComponent} from './home-product-categories-inspiration-cms.component';

describe('HomeProductCategoriesComponent', () => {
  let component: HomeProductCategoriesInspirationCmsComponent;
  let fixture: ComponentFixture<HomeProductCategoriesInspirationCmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeProductCategoriesInspirationCmsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      HomeProductCategoriesInspirationCmsComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
