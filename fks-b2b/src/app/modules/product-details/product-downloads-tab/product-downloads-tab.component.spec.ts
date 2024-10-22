import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductDownloadsTabComponent} from './product-downloads-tab.component';

describe('ProductDownloadsTabComponent', () => {
  let component: ProductDownloadsTabComponent;
  let fixture: ComponentFixture<ProductDownloadsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDownloadsTabComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDownloadsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
