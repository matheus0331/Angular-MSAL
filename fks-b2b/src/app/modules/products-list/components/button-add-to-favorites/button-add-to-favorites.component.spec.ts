import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonAddToFavoritesComponent} from './button-add-to-favorites.component';

describe('ButtonAddToFavoritesComponent', () => {
  let component: ButtonAddToFavoritesComponent;
  let fixture: ComponentFixture<ButtonAddToFavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonAddToFavoritesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAddToFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
