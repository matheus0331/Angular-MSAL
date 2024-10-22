import {BrowserModule,} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {SpartacusModule} from './spartacus/spartacus.module';
import {AuthGuard, CmsComponentAdapter, ConfigModule, OccProductSearchPageNormalizer, provideConfig,} from '@spartacus/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalBroadcastService,
  MsalGuard,
  MsalModule,
  MsalService,
} from '@azure/msal-angular';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {GoogleTagManagerModule} from 'angular-google-tag-manager';
import {ROUTER_CONFIGURATION} from '@angular/router';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import './shared/models/franke-checkout-step';
import './shared/models/address';
import './shared/models/user';
import './shared/models/b2b-unit';
import './shared/models/product';
import './shared/models/cart';
import {MSALGuardConfigFactory, MSALInstanceFactory, MSALInterceptorConfigFactory} from './configs/msal-config';
import {ExtendedMsalInterceptor} from '@core/interceptors/extended-msal/extended-msal.interceptor';
import {GuardsModule} from '@core/guards/guards.module';
import {FrankeMsalGuard} from '@core/guards/franke-msal/franke-msal.guard';
import {FrankeOccProductSearchPageNormalizer} from '@core/converters/franke-occ-product-search-page-normalizer';
import {FrankeCmsComponentAdapter} from '@core/adapters/franke-cms-component.adapter';

import {StoreModule} from '@ngrx/store';
import {ServicesModule} from '@core/services/services.module';
import {b2cLayoutConfig} from './configs/layout-config';
import {iconConfig} from '@shared/components/icons/icons.component';
import {defaultRoutingConfig} from './configs/routes-config';
import {InterceptorsModule} from '@core/interceptors/interceptors.module';
import {SharedModule} from '@modules/shared/shared.module';
import {OnNavigateConfig} from '@spartacus/storefront';
import {EffectsModule} from '@ngrx/effects';
import {AppRoutingModule} from './app-routing.module';

let devModules = [
  StoreDevtoolsModule.instrument({
    maxAge: 1000, // Retains last 25 states
    logOnly: environment.production, // Restrict extension to log-only mode
    autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    trace: true, //  If set to true, will include stack trace for every dispatched action
    traceLimit: 100, // maximum stack trace frames to be stored (in case trace option was provided as true)
  }),
];

if (environment.production) {
  devModules = [];
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    StoreModule.forRoot(),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    ...devModules,
    BrowserModule.withServerTransition({appId: 'fks-b2b'}),
    GoogleTagManagerModule.forRoot({
      id: 'GTM-MPWQFRL',
    }),
    HttpClientModule,
    ConfigModule.withConfig({
      ...b2cLayoutConfig,
      ...iconConfig,
      ...defaultRoutingConfig,
    }),
    AppRoutingModule,
    EffectsModule.forRoot([]),
    InterceptorsModule,
    SharedModule,
    ServicesModule,
    MsalModule,
    GuardsModule,
    SpartacusModule,
  ],
  providers: [

    provideConfig({
      enableResetViewOnNavigate: {
        active: true,
      },
    } as OnNavigateConfig),
    {
      provide: ROUTER_CONFIGURATION,
      useValue: {
        scrollPositionRestoration: 'enabled',
      },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ExtendedMsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalBroadcastService,
    {
      provide: MsalGuard,
      useClass: FrankeMsalGuard,
    },
    {
      provide: AuthGuard,
      useClass: FrankeMsalGuard,
    },
    {
      provide: OccProductSearchPageNormalizer,
      useClass: FrankeOccProductSearchPageNormalizer,
    },
    {
      provide: CmsComponentAdapter,
      useClass: FrankeCmsComponentAdapter,
    },
  ],
  bootstrap:
    [AppComponent],
})

export class AppModule {
}
