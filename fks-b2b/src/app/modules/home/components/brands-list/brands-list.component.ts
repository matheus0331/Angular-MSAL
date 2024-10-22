import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {OccConfig} from '@spartacus/core';

import {Brand} from 'src/app/shared/models/brand';
import {BrandsService} from 'src/app/core/services/brands/brands.service';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss'],
})
export class BrandsListComponent implements OnInit {
  brands$: Observable<Brand[]> = this.brandsService.brands$.asObservable();
  apiEndpoint: string;

  constructor(
    private brandsService: BrandsService,
    protected occConfig: OccConfig
  ) {
    this.apiEndpoint = this.occConfig.backend.occ.baseUrl;
  }

  ngOnInit(): void {
  }
}
