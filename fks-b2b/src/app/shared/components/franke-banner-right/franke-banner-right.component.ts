import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivationStart, NavigationEnd, Router} from '@angular/router';
import {OccConfig, WindowRef} from '@spartacus/core';
import {Subscription} from 'rxjs';
import {FrankeBannerComponent} from '../../models/franke-cms';

@Component({
  selector: 'app-franke-banner-right',
  templateUrl: './franke-banner-right.component.html',
  styleUrls: ['./franke-banner-right.component.scss'],
})
export class FrankeBannerRightComponent implements OnInit, OnDestroy {
  @Input() frankeBannerComponent: FrankeBannerComponent;
  apiEndpoint = this.occConfig.backend.occ.baseUrl;
  subscription: Subscription;

  constructor(
    protected occConfig: OccConfig,
    private router: Router,
    private winRef: WindowRef
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof ActivationStart) {
        this.winRef.nativeWindow.scrollTo(0, 0);
      }
      return;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
