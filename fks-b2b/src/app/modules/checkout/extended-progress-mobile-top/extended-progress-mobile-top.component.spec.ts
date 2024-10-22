import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtendedProgressMobileTopComponent} from './extended-progress-mobile-top.component';

describe('ExtendedProgressMobileTopComponent', () => {
  let component: ExtendedProgressMobileTopComponent;
  let fixture: ComponentFixture<ExtendedProgressMobileTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedProgressMobileTopComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedProgressMobileTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
