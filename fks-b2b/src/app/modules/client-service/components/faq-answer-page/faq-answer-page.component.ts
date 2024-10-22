import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LanguageService, OccConfig, WindowRef} from '@spartacus/core';
import {Observable, Subscription} from 'rxjs';
import {FrankeClientServiceScrollService} from 'src/app/core/services/franke-client-service-scroll/franke-client-service-scroll.service';

import {Brand} from 'src/app/shared/models/brand';
import {BrandsService} from '@core/services/brands/brands.service';
import {FrankeFaqService} from '@core/services/franke-faq/franke-faq.service';

@Component({
  selector: 'app-faq-answer-page',
  templateUrl: './faq-answer-page.component.html',
  styleUrls: ['./faq-answer-page.component.scss'],
})
export class FaqAnswerPageComponent implements OnInit, OnDestroy {
  copyright = `© Franke ${new Date().getUTCFullYear()}`;
  faqQuestions: any;
  question: string;
  answer: string;
  faqSub: Subscription;
  apiEndpoint: string;
  currentBrand$: Observable<Brand> = this.brandsService.currentBrand$.asObservable();

  constructor(
    protected occConfig: OccConfig,
    private winRef: WindowRef,
    private route: ActivatedRoute,
    protected frankeFaqService: FrankeFaqService,
    protected brandsService: BrandsService,
    protected languageService: LanguageService,
    private router: Router,
    private clientServiceScrollService: FrankeClientServiceScrollService
  ) {
    this.apiEndpoint = this.occConfig.backend.occ.baseUrl;
  }

  ngOnInit(): void {
    const section: string = this.route.snapshot.queryParamMap.get('section');
    const questionCategory: string = this.route.snapshot.queryParamMap.get(
      'category'
    );
    const questionId: string = this.route.snapshot.queryParamMap.get('id');
    const lang: string = this.route.snapshot.queryParamMap.get('lang');

    this.languageService.setActive(lang);

    switch (section) {
      case 'portal': {
        this.faqSub = this.frankeFaqService.faqPortalQuestions$.subscribe(
          (questions) => {
            this.faqQuestions = Object.values(questions);
          }
        );
        break;
      }
      case 'customer': {
        this.faqSub = this.frankeFaqService.faqCustomerServicesQuestions$.subscribe(
          (questions) => {
            this.faqQuestions = Object.values(questions);
          }
        );
        break;
      }
      case 'orders': {
        this.faqSub = this.frankeFaqService.faqOrdersAndShipmentQuestions$.subscribe(
          (questions) => {
            this.faqQuestions = Object.values(questions);
          }
        );
        break;
      }
      default: {
        this.faqSub = this.frankeFaqService.faqProductQuestions$.subscribe(
          (questions) => {
            this.faqQuestions = Object.values(questions);
          }
        );
      }
    }

    this.faqQuestions.find((category) => {
      if (category.category === questionCategory) {
        this.question = category.questions[questionId].question;
        this.answer = category.questions[questionId].answer;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.faqSub) {
      this.faqSub.unsubscribe();
    }
  }

  processLinks(event: any): void {
    const element: HTMLElement = event.target;
    const link = element.getAttribute('href');
    const linkClass = element.getAttribute('class');
    if (link) {
      if (link.startsWith('/')) {
        event.preventDefault();
        if (linkClass) {
          if (linkClass.toString() === 'form') {
            this.router.navigateByUrl(link);
            this.clientServiceScrollService.activateScroll(
              this.router.url,
              'scroll-section-contact-form'
            );
          }
        }
        this.router.navigateByUrl(link);
      }
    }
  }

  printPage(): void {
    this.winRef.nativeWindow.print();
  }
}
