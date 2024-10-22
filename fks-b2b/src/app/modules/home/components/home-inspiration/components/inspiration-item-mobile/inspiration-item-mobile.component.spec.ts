import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InspirationItemMobileComponent} from './inspiration-item-mobile.component';

describe('InspirationItemMobileComponent', () => {
  let component: InspirationItemMobileComponent;
  let fixture: ComponentFixture<InspirationItemMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InspirationItemMobileComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspirationItemMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
