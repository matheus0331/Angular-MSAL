import {Injectable} from '@angular/core';
import {LanguageService} from '@spartacus/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import * as faq_EN from '../../../../assets/locale/en/faq.json';
import * as faq_GB from '../../../../assets/locale/en_GB/faq.json';
import * as faq_DE_CH from '../../../../assets/locale/de_CH/faq.json';
import * as faq_DE from '../../../../assets/locale/de/faq.json';
import * as faq_FR_CH from '../../../../assets/locale/fr_CH/faq.json';
import * as faq_FR from '../../../../assets/locale/fr/faq.json';
import * as faq_IT_CH from '../../../../assets/locale/it_CH/faq.json';
import * as faq_IT from '../../../../assets/locale/it/faq.json';
import * as faq_NL from '../../../../assets/locale/nl/faq.json';
import * as faq_PL from '../../../../assets/locale/pl/faq.json';
import * as faq_ES from '../../../../assets/locale/es/faq.json';
import * as faq_PT from '../../../../assets/locale/pt/faq.json';
import * as faq_NO from '../../../../assets/locale/no/faq.json';
import * as faq_SV from '../../../../assets/locale/sv/faq.json';
import * as faq_DA from '../../../../assets/locale/da/faq.json';

@Injectable({
  providedIn: 'root',
})
export class FrankeFaqService {
  readonly faqProductQuestions$: Observable<any> = this.languageService
    .getActive()
    .pipe(
      map((currentLanguage) => {
        return this.getFAQs(currentLanguage, 'productQuestions');
      })
    );
  readonly faqPortalQuestions$: Observable<any> = this.languageService
    .getActive()
    .pipe(
      map((currentLanguage) => {
        return this.getFAQs(currentLanguage, 'portalQuestions');
      })
    );
  readonly faqOrdersAndShipmentQuestions$: Observable<any> = this.languageService
    .getActive()
    .pipe(
      map((currentLanguage) => {
        return this.getFAQs(currentLanguage, 'ordersAndShipmentQuestions');
      })
    );
  readonly faqCustomerServicesQuestions$: Observable<any> = this.languageService
    .getActive()
    .pipe(
      map((currentLanguage) => {
        return this.getFAQs(currentLanguage, 'customerServicesQuestions');
      })
    );

  constructor(protected languageService: LanguageService) {
  }

  getFAQs(language: string, faqCategory: string): Observable<any> {
    const defaultProp = 'default';
    switch (language) {
      case 'de_CH': {
        return faq_DE_CH[defaultProp][faqCategory];
      }
      case 'de': {
        return faq_DE[defaultProp][faqCategory];
      }
      case 'fr_CH': {
        return faq_FR_CH[defaultProp][faqCategory];
      }
      case 'fr': {
        return faq_FR[defaultProp][faqCategory];
      }
      case 'it_CH': {
        return faq_IT_CH[defaultProp][faqCategory];
      }
      case 'it': {
        return faq_IT[defaultProp][faqCategory];
      }
      case 'nl': {
        return faq_NL[defaultProp][faqCategory];
      }
      case 'pl': {
        return faq_PL[defaultProp][faqCategory];
      }
      case 'es': {
        return faq_ES[defaultProp][faqCategory];
      }
      case 'pt': {
        return faq_PT[defaultProp][faqCategory];
      }
      case 'no': {
        return faq_NO[defaultProp][faqCategory];
      }
      case 'sv': {
        return faq_SV[defaultProp][faqCategory];
      }
      case 'da': {
        return faq_DA[defaultProp][faqCategory];
      }
      case 'en_GB': {
        return faq_GB[defaultProp][faqCategory];
      }
      default: {
        return faq_EN[defaultProp][faqCategory];
      }
    }
  }
}
