import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InspirationItemLargeImgComponent} from './inspiration-item-large-img.component';

describe('InspirationItemLargeImgComponent', () => {
  let component: InspirationItemLargeImgComponent;
  let fixture: ComponentFixture<InspirationItemLargeImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InspirationItemLargeImgComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspirationItemLargeImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
