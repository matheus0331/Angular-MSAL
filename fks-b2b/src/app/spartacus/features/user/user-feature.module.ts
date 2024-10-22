import {NgModule} from '@angular/core';
import {CmsConfig, I18nConfig, provideConfig} from '@spartacus/core';
import {userAccountTranslationChunksConfig, userAccountTranslations} from '@spartacus/user/account/assets';
import {USER_ACCOUNT_FEATURE, UserAccountRootModule} from '@spartacus/user/account/root';
import {userProfileTranslationChunksConfig, userProfileTranslations} from '@spartacus/user/profile/assets';
import {USER_PROFILE_FEATURE, UserProfileRootModule} from '@spartacus/user/profile/root';

@NgModule({
  declarations: [],
  imports: [
    UserAccountRootModule,
    UserProfileRootModule
  ],
  providers: [provideConfig({
    featureModules: {
      [USER_ACCOUNT_FEATURE]: {
        module: () =>
          import('@spartacus/user/account').then((m) => m.UserAccountModule),
      },
    }
  } as CmsConfig),
    provideConfig({
      i18n: {
        resources: userAccountTranslations,
        chunks: userAccountTranslationChunksConfig,
      },
    } as I18nConfig),
    provideConfig({
      featureModules: {
        [USER_PROFILE_FEATURE]: {
          module: () =>
            import('@spartacus/user/profile').then((m) => m.UserProfileModule),
        },
      }
    } as CmsConfig),
    provideConfig({
      i18n: {
        resources: userProfileTranslations,
        chunks: userProfileTranslationChunksConfig,
      },
    } as I18nConfig)
  ]
})
export class UserFeatureModule {
}
