import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InspirationItemImgLeftComponent} from './inspiration-item-img-left.component';

describe('InspirationItemImgLeftComponent', () => {
  let component: InspirationItemImgLeftComponent;
  let fixture: ComponentFixture<InspirationItemImgLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InspirationItemImgLeftComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspirationItemImgLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
