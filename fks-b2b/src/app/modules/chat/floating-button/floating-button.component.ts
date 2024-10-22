import {Component, Input} from '@angular/core';
import {ICON_TYPE} from '@spartacus/storefront';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent {
  @Input() icon: ICON_TYPE;
}
