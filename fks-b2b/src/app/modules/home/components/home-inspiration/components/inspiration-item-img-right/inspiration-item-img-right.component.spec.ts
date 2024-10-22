import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InspirationItemImgRightComponent} from './inspiration-item-img-right.component';

describe('InspirationItemImgRightComponent', () => {
  let component: InspirationItemImgRightComponent;
  let fixture: ComponentFixture<InspirationItemImgRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InspirationItemImgRightComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspirationItemImgRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
