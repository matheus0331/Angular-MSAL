import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtendedWishListComponent} from './extended-wish-list.component';

describe('ExtendedWishListComponent', () => {
  let component: ExtendedWishListComponent;
  let fixture: ComponentFixture<ExtendedWishListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedWishListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedWishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
