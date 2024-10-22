import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CmsConfig, ConfigModule, I18nModule, UrlModule} from '@spartacus/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {IconModule, SpinnerModule} from '@spartacus/storefront';
import {FormsModule} from '@angular/forms';
import {AddressesComponent} from './components/addresses/addresses.component';
import {RouterModule} from '@angular/router';
import {TicketHistoryComponent} from './components/ticket-history/ticket-history.component';

@NgModule({
  declarations: [DashboardComponent, AddressesComponent, TicketHistoryComponent],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        DashboardContentComponent: {
          component: DashboardComponent,
        },
      },
    } as CmsConfig),
    BrowserModule,
    NgbModule,
    IconModule,
    FormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    SpinnerModule,
  ],
})
export class DashboardModule {
}
