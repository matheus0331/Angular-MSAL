import {AlternativeProduct} from './../../../../../shared/models/alternative-products';
import {FrankeOrderDetails} from './../../../../../shared/models/franke-order';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICON_TYPE, LaunchDialogService} from '@spartacus/storefront';
import {Image} from '@spartacus/core';
import {ICONS} from '@shared/components/icons/icons.component';

@Component({
  selector: 'app-order-details-product-replacement-modal-content',
  templateUrl:
    './order-details-product-replacement-modal-content.component.html',
  styleUrls: [
    './order-details-product-replacement-modal-content.component.scss',
  ],
})
export class OrderDetailsorderDetailsProductReplacementModalContentComponent
  implements OnInit {
  @Input() order: FrankeOrderDetails;
  @Input() alternative: AlternativeProduct;

  @Output() replaceActionClick = new EventEmitter<boolean>();

  productImage: Image;
  iconTypes = ICON_TYPE;
  icons = ICONS;

  constructor(protected launchDialogService: LaunchDialogService) {
  }

  ngOnInit(): void {
    this.setProductImage(this.order.product.images);
  }

  setProductImage(productImages: Image): void {
    if (!productImages) {
      return;
    }
    const image = (productImages as Image[]).find(
      (img) => img.format === 'thumbnail'
    );
    this.productImage = image ? image : productImages;
  }

  handleReplaceActionClick(replace: boolean): void {
    this.replaceActionClick.emit(replace);
  }

  dismissModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }
}
