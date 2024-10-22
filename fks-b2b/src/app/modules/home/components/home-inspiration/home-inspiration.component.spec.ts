import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeInspirationComponent} from './home-inspiration.component';

describe('HomeInspirationComponent', () => {
  let component: HomeInspirationComponent;
  let fixture: ComponentFixture<HomeInspirationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeInspirationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeInspirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
