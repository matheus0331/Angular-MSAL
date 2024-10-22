import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {CmsSearchBoxComponent, Product, ProductScope, ProductService, RoutingService, WindowRef} from '@spartacus/core';
import {CmsComponentData, SearchBoxComponentService} from '@spartacus/storefront';
import {BehaviorSubject, Subscription} from 'rxjs';
import {DownloadProductDocumentsService} from 'src/app/core/services/download-product-documents/download-product-documents.service';
import {FrankeSearchBoxComponent} from 'src/app/shared/components/franke-search-box/franke-search-box.component';

@Component({
  selector: 'app-documents-search',
  templateUrl: './documents-search.component.html',
  styleUrls: ['./documents-search.component.scss'],
})
export class DocumentsSearchComponent
  extends FrankeSearchBoxComponent
  implements OnInit, OnDestroy {
  @ViewChild(FrankeSearchBoxComponent) searchBoxRef: FrankeSearchBoxComponent;
  searchInput: any;
  visible = false;
  currentProduct: Product;
  productDownloads$ =  new BehaviorSubject([]);
  openById = {};
  private routeSub: any;
  private productSub: Subscription;

  constructor(
    searchBoxComponentService: SearchBoxComponentService,
    componentData: CmsComponentData<CmsSearchBoxComponent>,
    winRef: WindowRef,
    private router: Router,
    protected downloadProductDocumentsService: DownloadProductDocumentsService,
    private productService: ProductService,
    routingService: RoutingService
  ) {
    super(searchBoxComponentService, componentData, routingService, winRef);
  }

  ngOnInit(): void {
    this.visible = false;
    this.routeSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.visible) {
        this.toggleSearch();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
  }

  onChanged(value: any): void {
    const searchBoxWrapper = this.winRef.document.getElementsByClassName(
      'search-box-wrapper'
    )[0];

    // tslint:disable-next-line: prefer-const
    let searchListener = (event) => {
      if (!this.childOf(event.target)) {
        if (!this.childOf(event.target) && this.visible) {
          this.toggleSearch();
          this.winRef.document.removeEventListener('click', searchListener);
        }
      }
    };
    if (value) {
      searchBoxWrapper.classList.add('active');
      this.visible = true;
      this.searchInput = value;
      this.winRef.document.addEventListener('click', searchListener);
    } else {
      this.toggleSearch();
    }
  }

  toggleSearch(): void {
    const searchBoxWrapper = this.winRef.document.getElementsByClassName(
      'search-box-wrapper'
    )[0];

    this.visible = false;
    searchBoxWrapper.classList.remove('active');
    this.winRef.document.body.classList.remove('searchbox-is-active');
    this.clear(this.searchBoxRef.searchInputRef.nativeElement);
  }

  selectProduct(product: Product): void {
    this.currentProduct = product;
    this.productSub = this.productService
      .get(product.code, ProductScope.DETAILS)
      .subscribe((selectedProduct) => {
        if (selectedProduct) {
          this.setDocuments(selectedProduct);
        }
      });
  }

  handleChange(event: NgbPanelChangeEvent): void {
    this.openById[event.panelId] = event.nextState;
  }

  setDocuments(product: Product): void {
    if (product.documents) {
      this.productDownloads$.next(this.downloadProductDocumentsService.createGroups(product));
    }
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
  }

  childOf(node: any): boolean {
    const searchBoxWrapper = this.winRef.document.getElementsByClassName(
      'search-box-wrapper'
    )[0];

    let child = node;

    while (child !== null) {
      if (child === searchBoxWrapper) {
        return true;
      }
      child = child.parentNode;
    }
    return false;
  }
}
