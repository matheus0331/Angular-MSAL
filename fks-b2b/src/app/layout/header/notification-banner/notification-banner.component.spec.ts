import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NotificationBannerComponent} from './notification-banner.component';

describe('NotificationItemComponent', () => {
  let component: NotificationBannerComponent;
  let fixture: ComponentFixture<NotificationBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationBannerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
