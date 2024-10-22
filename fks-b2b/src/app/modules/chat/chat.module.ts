import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CmsConfig, ConfigModule, I18nModule, UrlModule} from '@spartacus/core';
import {ChatComponent} from './chat.component';
import {IconModule} from '@spartacus/storefront';
import {FloatingButtonComponent} from './floating-button/floating-button.component';
import {ChatOptionsComponent} from './chat-options/chat-options.component';
import {SupportChatComponent} from './support-chat/support-chat.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ChatComponent,
    FloatingButtonComponent,
    ChatOptionsComponent,
    SupportChatComponent,
  ],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        ChatButtonComponent: {
          component: ChatComponent,
        },
      },
    } as CmsConfig),
    IconModule,
    I18nModule,
    UrlModule,
    RouterModule,
  ],
})
export class ChatModule {
}
