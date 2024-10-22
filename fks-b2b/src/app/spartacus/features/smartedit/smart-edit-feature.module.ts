import {NgModule} from '@angular/core';
import {CmsConfig, provideConfig} from '@spartacus/core';
import {SMART_EDIT_FEATURE, SmartEditConfig, SmartEditRootModule} from '@spartacus/smartedit/root';
import {getEnvironmentName} from '../../../configs/runtime-env';

const origin = '*.ct075nck5-franketec1-' + getEnvironmentName() + '-public.model-t.cc.commerce.ondemand.com:443,www.google.com:443, localhost:9002';

@NgModule({
  declarations: [],
  imports: [
    SmartEditRootModule
  ],
  providers: [provideConfig({
    featureModules: {
      [SMART_EDIT_FEATURE]: {
        module: () =>
          import('@spartacus/smartedit').then((m) => m.SmartEditModule),
      },
    }
  } as CmsConfig),
    provideConfig({
      smartEdit: {
        storefrontPreviewRoute: 'cx-preview',
        allowOrigin: origin,
      },
    } as SmartEditConfig)
  ]
})
export class SmartEditFeatureModule {
}
