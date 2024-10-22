import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LanguageCurrencySelectorComponent} from './language-currency-selector.component';

describe('LanguageCurrencySelectorComponent', () => {
  let component: LanguageCurrencySelectorComponent;
  let fixture: ComponentFixture<LanguageCurrencySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageCurrencySelectorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageCurrencySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
