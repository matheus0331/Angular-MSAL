import {ComponentFixture, TestBed} from '@angular/core/testing';
import {OrderDetailsorderDetailsProductReplacementModalContentComponent} from './order-details-product-replacement-modal-content.component';

describe('OrderDetailsorderDetailsProductReplacementModalContentComponent ', () => {
  let component: OrderDetailsorderDetailsProductReplacementModalContentComponent;
  let fixture: ComponentFixture<OrderDetailsorderDetailsProductReplacementModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        OrderDetailsorderDetailsProductReplacementModalContentComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      OrderDetailsorderDetailsProductReplacementModalContentComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
