import {HttpClient} from '@angular/common/http';
import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {BaseSiteService, OccEndpointsService} from '@spartacus/core';
import {FRANKE_ORDER_STATUS, FrankeOrderDetails} from 'src/app/shared/models/franke-order';
import {ExtendedBaseStore} from 'src/app/shared/models/misc';

@Component({
  selector:
    'app-order-details-item-delivery-status, [app-order-details-item-delivery-status]',
  templateUrl: './order-details-item-delivery-status.component.html',
  styleUrls: ['./order-details-item-delivery-status.component.scss'],
})
export class OrderDetailsItemDeliveryStatusComponent implements OnInit {
  @Input() order: FrankeOrderDetails;
  showDeliveryStatus: boolean;
  showAlternativesInOrderHistory: boolean;
  deliveryDateMoreThanSevenDays: boolean;
  itemCategoryNotZTN: boolean;
  deliveryDateMissing: boolean;

  constructor(
    private http: HttpClient,
    private endpoint: OccEndpointsService,
    private cd: ChangeDetectorRef,
    private storeService: BaseSiteService
  ) {
  }

  ngOnInit(): void {
    this.setStatus();

    this.storeService.getActive().subscribe((store) => {
      this.http
        .get<ExtendedBaseStore>(this.endpoint.buildUrl(`/basestores/${store}`))
        .subscribe((data) => {
          this.showAlternativesInOrderHistory = data.showAlternativesInOrderHistory;

          this.cd.detectChanges();
          this.cd.detach();
        });
    });
  }

  setStatus(): void {
    if (this.order.deliveryDate && this.order.deliveryDate !== '') {
      const todayDate = new Date();
      const deliverDateT = new Date(
        Number(this.order.deliveryDate.replace(/(\d{4})(\d{2})(\d{2})/g, '$1')),
        Number(this.order.deliveryDate.replace(/(\d{4})(\d{2})(\d{2})/g, '$2')) - 1,
        Number(this.order.deliveryDate.replace(/(\d{4})(\d{2})(\d{2})/g, '$3'))
      );
      const deliverDateD = (deliverDateT.getTime() - todayDate.getTime()) / 1000;
      this.deliveryDateMoreThanSevenDays = deliverDateD > 604800;
    } else {
      this.deliveryDateMissing = true;
    }

    this.itemCategoryNotZTN = this.order.itemCategory && this.order.itemCategory !== 'ZTN';

    this.showDeliveryStatus =
      this.deliveryDateMissing &&
      this.order.orderStatus === FRANKE_ORDER_STATUS.ORDER_ACKNOWLEDGED &&
      this.isValidProduct() ||
      this.order.orderStatus === FRANKE_ORDER_STATUS.ORDER_ACKNOWLEDGED &&
      this.order.deliveryDate > this.order.frozenDeliveryDate &&
      this.deliveryDateMoreThanSevenDays &&
      this.itemCategoryNotZTN &&
      this.isValidProduct();
  }

  isValidProduct(): boolean {
    if (this.order.product && this.order.product.code) {
      return true;
    }
    return false;
  }
}
