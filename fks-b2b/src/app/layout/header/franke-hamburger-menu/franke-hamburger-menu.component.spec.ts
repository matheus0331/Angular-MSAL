import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FrankeHamburgerMenuComponent} from './franke-hamburger-menu.component';

describe('FrankeHamburgerMenuComponent', () => {
  let component: FrankeHamburgerMenuComponent;
  let fixture: ComponentFixture<FrankeHamburgerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrankeHamburgerMenuComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrankeHamburgerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
