import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CmsConfig, ConfigModule, I18nModule, UrlModule} from '@spartacus/core';
import {FormErrorsModule, IconModule, MediaModule} from '@spartacus/storefront';
import {NgSelectModule} from '@ng-select/ng-select';
import {ReactiveFormsModule} from '@angular/forms';

import {FaqListComponent} from './components/faq-list/faq-list.component';
import {FaqAnswerPageComponent} from './components/faq-answer-page/faq-answer-page.component';
import {DocumentsSearchComponent} from './components/documents-search/documents-search.component';
import {DocumentsSearchResultsComponent} from './components/documents-search-results/documents-search-results.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {ContactUsFormComponent} from './components/contact-us-form/contact-us-form.component';
import {TutorialVideoComponent} from './components/tutorial-video/tutorial-video.component';

@NgModule({
  declarations: [
    FaqListComponent,
    FaqAnswerPageComponent,
    DocumentsSearchComponent,
    DocumentsSearchResultsComponent,
    ContactUsFormComponent,
    TutorialVideoComponent,
  ],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
        DocumentSearchBoxComponent: {
          component: DocumentsSearchComponent,
        },
        FAQArticleListComponent: {
          component: FaqListComponent,
        },
        FAQAnswerComponent: {
          component: FaqAnswerPageComponent,
        },
        ContactUsFormComponent: {
          component: ContactUsFormComponent,
        },
        TutorialVideoComponent: {
          component: TutorialVideoComponent,
        },
      },
    } as CmsConfig),
    IconModule,
    SharedModule,
    MediaModule,
    RouterModule,
    UrlModule,
    NgbModule,
    BrowserModule,
    I18nModule,
    NgSelectModule,
    FormErrorsModule,
    ReactiveFormsModule,
  ],
})
export class ClientServiceModule {
}
