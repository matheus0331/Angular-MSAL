import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomAddToWishListComponent} from './custom-add-to-wish-list.component';

describe('CustomAddToWishListComponent', () => {
  let component: CustomAddToWishListComponent;
  let fixture: ComponentFixture<CustomAddToWishListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomAddToWishListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAddToWishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
