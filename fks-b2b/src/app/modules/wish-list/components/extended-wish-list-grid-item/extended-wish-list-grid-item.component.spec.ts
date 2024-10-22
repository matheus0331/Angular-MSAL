import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtendedWishListGridItemComponent} from './extended-wish-list-grid-item.component';

describe('ExtendedWishListGridItemComponent', () => {
  let component: ExtendedWishListGridItemComponent;
  let fixture: ComponentFixture<ExtendedWishListGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedWishListGridItemComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedWishListGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
