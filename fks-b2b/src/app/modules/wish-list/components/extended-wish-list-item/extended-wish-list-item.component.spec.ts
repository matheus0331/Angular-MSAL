import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtendedWishListItemComponent} from './extended-wish-list-item.component';

describe('ExtendedWishListItemComponent', () => {
  let component: ExtendedWishListItemComponent;
  let fixture: ComponentFixture<ExtendedWishListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedWishListItemComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedWishListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
