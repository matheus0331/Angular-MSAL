import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';
import {CmsNavigationComponent, WindowRef} from '@spartacus/core';
import {CmsComponentData} from '@spartacus/storefront';
import {Observable} from 'rxjs';
import {BrandsService} from 'src/app/core/services/brands/brands.service';
import {FrankeNavigationNodeService} from 'src/app/core/services/franke-navigation-node/franke-navigation-node.service';
import {FrankeNavigationNode} from 'src/app/shared/models/franke-navigation-node';

@Component({
  selector: 'app-category-navigation',
  templateUrl: './category-navigation.component.html',
  styleUrls: ['./category-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryNavigationNodeComponent {
  node$: Observable<FrankeNavigationNode> = this.service.getNavigationNode(
    this.componentData.data$
  );
  data$: Observable<CmsNavigationComponent> = this.componentData.data$;

  constructor(
    protected componentData: CmsComponentData<CmsNavigationComponent>,
    protected service: FrankeNavigationNodeService,
    protected router: Router,
    protected winRef: WindowRef,
    protected brandsService: BrandsService
  ) {
  }
}
