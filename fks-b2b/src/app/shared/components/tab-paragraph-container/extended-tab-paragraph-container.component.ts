import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TabParagraphContainerComponent} from '@spartacus/storefront';

@Component({
  selector: 'extended-tab-paragraph-container',
  templateUrl: './extended-tab-paragraph-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExtendedTabParagraphContainerComponent extends TabParagraphContainerComponent {

}
