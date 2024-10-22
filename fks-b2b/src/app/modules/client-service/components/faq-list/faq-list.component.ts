import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {LanguageService, WindowRef} from '@spartacus/core';
import {Observable} from 'rxjs';
import {FrankeFaqService} from 'src/app/core/services/franke-faq/franke-faq.service';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
  host: {class: 'scroll-section-faq'},
})
export class FaqListComponent implements OnInit {
  faqProductQuestions$: Observable<any> = this.frankeFaqService
    .faqProductQuestions$;
  faqPortalQuestions$: Observable<any> = this.frankeFaqService
    .faqPortalQuestions$;
  faqOrdersAndShipmentQuestions$: Observable<any> = this.frankeFaqService
    .faqOrdersAndShipmentQuestions$;
  faqCustomerServicesQuestions$: Observable<any> = this.frankeFaqService
    .faqCustomerServicesQuestions$;
  openById = {};

  constructor(
    protected winRef: WindowRef,
    protected frankeFaqService: FrankeFaqService,
    protected languageService: LanguageService,
    protected navigationRouter: Router
  ) {
  }

  ngOnInit(): void {
  }

  handleChange(event: NgbPanelChangeEvent): void {
    this.openById[event.panelId] = event.nextState;
  }

  getAnswer(category: string, questionId: number, section: string): void {
    this.languageService
      .getActive()
      .subscribe((currentLanguage) => {
        const url = this.navigationRouter.serializeUrl(
          this.navigationRouter.parseUrl(
            `/faq-answer/?section=${section}&category=${category}&id=${questionId}&lang=${currentLanguage}`
          )
        );
        window.open(url, '_blank');
      })
      .unsubscribe();
  }
}
