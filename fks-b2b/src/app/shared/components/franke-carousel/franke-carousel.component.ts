import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { CarouselComponent, CarouselService } from '@spartacus/storefront';

const ACTIVE = 'active';
const TIME_BEFORE_NEXT_SLIDE = 15000;

@Component({
  selector: 'app-franke-carousel',
  templateUrl: './franke-carousel.component.html',
  styleUrls: ['./franke-carousel.component.scss'],
})
export class FrankeCarouselComponent
  extends CarouselComponent
  implements AfterViewInit, OnDestroy {
  @Input() isSideArrows: boolean;
  @Input() browseAllLink: string;
  @Input() slidesPath: string;
  @Input() indicatorsPath: string;
  private timerInterval: any;
  private slides: HTMLCollectionOf<Element>;
  private indicators: NodeListOf<Element>;

  constructor(
    el: ElementRef,
    service: CarouselService,
    private winRef: WindowRef
  ) {
    super(el, service);
  }

  ngAfterViewInit(): void {
    if (!this.isSideArrows) {
      this.getSlidesAndIndicators();
      this.onChangeSlide();
    }
  }

  onChangeSlide(): void {
    this.timerInterval = setInterval(() => {
      this.getSlidesAndIndicators();
      if (this.slides.length && this.indicators.length) {
        this.removeActiveSlide(
          this.slides[this.activeSlide],
          this.indicators[this.activeSlide]
        );
        this.activeSlide + 1 === this.slides.length
          ? (this.activeSlide = 0)
          : this.activeSlide++;

        this.setActiveSlide(
          this.slides[this.activeSlide],
          this.indicators[this.activeSlide]
        );
      }
    }, TIME_BEFORE_NEXT_SLIDE);
  }

  onSlideClick(index: number): void {
    clearInterval(this.timerInterval);
    this.getSlidesAndIndicators();

    this.removeActiveSlide(
      this.slides[this.activeSlide],
      this.indicators[this.activeSlide]
    );

    this.activeSlide = index;
    this.setActiveSlide(
      this.slides[this.activeSlide],
      this.indicators[this.activeSlide]
    );

    this.onChangeSlide();
  }

  setActiveSlide(slide: Element, indicator: any): void {
    slide.classList.add(ACTIVE);
    slide.firstElementChild.classList.add(ACTIVE);
    indicator.disabled = true;
  }

  removeActiveSlide(slide: Element, indicator: any): void {
    slide.classList.remove(ACTIVE);
    slide.firstElementChild.classList.remove(ACTIVE);
    indicator.disabled = false;
  }

  getSlidesAndIndicators(): void {
    this.slides = this.winRef.document
      .querySelector(this.slidesPath)
      .getElementsByClassName('slide');

    this.indicators = this.winRef.document.querySelectorAll(
      this.indicatorsPath
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }
}
