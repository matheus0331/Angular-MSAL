import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtendedProgressMobileBottomComponent} from './extended-progress-mobile-bottom.component';

describe('ExtendedProgressMobileBottomComponent', () => {
  let component: ExtendedProgressMobileBottomComponent;
  let fixture: ComponentFixture<ExtendedProgressMobileBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedProgressMobileBottomComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedProgressMobileBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
