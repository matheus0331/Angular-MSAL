import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrankeSearchBoxComponent } from './franke-search-box.component';

describe('FrankeSearchBoxComponent', () => {
  let component: FrankeSearchBoxComponent;
  let fixture: ComponentFixture<FrankeSearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrankeSearchBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrankeSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
