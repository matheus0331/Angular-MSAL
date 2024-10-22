import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FaqAnswerPageComponent} from './faq-answer-page.component';

describe('FaqAnswerPageComponent', () => {
  let component: FaqAnswerPageComponent;
  let fixture: ComponentFixture<FaqAnswerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaqAnswerPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqAnswerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
