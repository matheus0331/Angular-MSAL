import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonChangeViewModeComponent} from './button-change-view-mode.component';

describe('ButtonChangeViewModeComponent', () => {
  let component: ButtonChangeViewModeComponent;
  let fixture: ComponentFixture<ButtonChangeViewModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonChangeViewModeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonChangeViewModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
