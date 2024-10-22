/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {APP_INITIALIZER, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {provideDefaultConfig} from '@spartacus/core';
import {defaultOnNavigateConfig, OnNavigateService} from '@spartacus/storefront';

@NgModule({
  imports: [
    RouterModule.forRoot([], {
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled'
    }),
  ],
  providers: [
    provideDefaultConfig(defaultOnNavigateConfig),
    {
      provide: APP_INITIALIZER,
      useFactory: onNavigateFactory,
      deps: [OnNavigateService],
      multi: true,
    },
  ],
})
export class AppRoutingModule {
}

export function onNavigateFactory(
  onNavigateService: OnNavigateService
): () => void {
  const isReady = () => onNavigateService.initializeWithConfig();
  return isReady;
}
