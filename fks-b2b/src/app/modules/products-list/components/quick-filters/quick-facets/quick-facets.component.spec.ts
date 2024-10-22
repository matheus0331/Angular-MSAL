import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuickFacetsComponent} from './quick-facets.component';

describe('QuickFacetsComponent', () => {
  let component: QuickFacetsComponent;
  let fixture: ComponentFixture<QuickFacetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuickFacetsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickFacetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
