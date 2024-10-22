import { Component, Input, OnInit } from '@angular/core';
import { OccConfig } from '@spartacus/core';
import { FrankeBannerComponent } from '../../models/franke-cms';

@Component({
  selector: 'app-franke-homepage-banner',
  templateUrl: './franke-homepage-banner.component.html',
  styleUrls: ['./franke-homepage-banner.component.scss'],
})
export class FrankeHomepageBannerComponent implements OnInit {
  @Input() frankeBannerComponent: FrankeBannerComponent;
  apiEndpoint = this.occConfig.backend.occ.baseUrl;
  constructor(protected occConfig: OccConfig) {}

  ngOnInit(): void {}
}
