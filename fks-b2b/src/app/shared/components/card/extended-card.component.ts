import { Component, Input } from '@angular/core';
import { CardComponent } from '@spartacus/storefront';

@Component({
  selector: 'app-card',
  templateUrl: './extended-card.component.html',
  styleUrls: ['./extended-card.component.scss']
})
export class ExtendedCardComponent extends CardComponent {
  @Input()
  inactive = false;

  @Input()
  isInAddressBook = false;
}
