import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {OccConfig, WindowRef} from '@spartacus/core';
import {SiteContextComponentService, SiteContextSelectorComponent} from '@spartacus/storefront';

@Component({
  selector: 'app-language-currency-selector',
  templateUrl: './language-currency-selector.component.html',
  styleUrls: ['./language-currency-selector.component.scss'],
})
export class LanguageCurrencySelectorComponent
  extends SiteContextSelectorComponent
  implements OnInit {
  activeLabel: any;
  activeFlag: any;
  apiEndpoint: string;
  isAnyDropDownOpen = false;

  constructor(
    componentService: SiteContextComponentService,
    protected winRef: WindowRef,
    protected occConfig: OccConfig,
    private eRef: ElementRef
  ) {
    super(componentService);
    this.apiEndpoint = this.occConfig.backend.occ.baseUrl;
  }

  @HostListener('document:click', ['$event']) onClick(event): void {
    if (
      this.isAnyDropDownOpen &&
      !this.eRef.nativeElement.contains(event.target)
    ) {
      this.closeDropDown('language');
    }
  }

  ngOnInit(): void {
    this.getActiveLabel();
  }

  toggleDropDown(event, type: string): void {
    if (type === 'currency') {
      if (this.isDropDownOpen('language')) {
        this.closeDropDown('language');
      }
      if (this.isDropDownOpen('currency')) {
        this.closeDropDown('currency');
      } else {
        this.openDropDown('currency');
      }
    }
    if (type === 'language') {
      if (this.isDropDownOpen('currency')) {
        this.closeDropDown('currency');
      }
      if (this.isDropDownOpen('language')) {
        this.closeDropDown('language');
      } else {
        this.openDropDown('language');
      }
    }
  }

  isDropDownOpen(type: string): boolean {
    if (type === 'currency') {
      const openCurrencyDropDownDiv = this.getDropDownElements(
        'currency dropdown show'
      );
      const openCurrencyDropDownMenu = this.getDropDownElements(
        'currency dropdown-menu show'
      );
      return openCurrencyDropDownMenu.length > 0 &&
      openCurrencyDropDownDiv.length > 0
        ? true
        : false;
    }
    if (type === 'language') {
      const openLanguageDropDownDiv = this.getDropDownElements(
        'language dropdown show'
      );
      const openLanguageDropDownMenu = this.getDropDownElements(
        'language dropdown-menu show'
      );
      return openLanguageDropDownDiv.length > 0 &&
      openLanguageDropDownMenu.length > 0
        ? true
        : false;
    }
  }

  openDropDown(type: string): void {
    if (type === 'currency') {
      const currencyDropDownDiv = this.getDropDownElements('currency dropdown');
      const currencyDropDownMenu = this.getDropDownElements(
        'currency dropdown-menu'
      );
      this.addDropDownShowClass(currencyDropDownDiv);
      this.addDropDownShowClass(currencyDropDownMenu);
    }
    if (type === 'language') {
      const languageDropDownDiv = this.getDropDownElements('language dropdown');
      const languageDropDownMenu = this.getDropDownElements(
        'language dropdown-menu'
      );
      this.addDropDownShowClass(languageDropDownDiv);
      this.addDropDownShowClass(languageDropDownMenu);
    }
  }

  closeDropDown(type: string): void {
    if (type === 'currency') {
      const openCurrencyDropDownDiv = this.getDropDownElements(
        'currency dropdown show'
      );
      const openCurrencyDropDownMenu = this.getDropDownElements(
        'currency dropdown-menu show'
      );
      this.removeDropDownShowClass(openCurrencyDropDownDiv);
      this.removeDropDownShowClass(openCurrencyDropDownMenu);
    }
    if (type === 'language') {
      const openLanguageDropDownDiv = this.getDropDownElements(
        'language dropdown show'
      );
      const openLanguageDropDownMenu = this.getDropDownElements(
        'language dropdown-menu show'
      );
      this.removeDropDownShowClass(openLanguageDropDownDiv);
      this.removeDropDownShowClass(openLanguageDropDownMenu);
    }
  }

  getDropDownElements(className: string): HTMLCollectionOf<Element> {
    return this.winRef.document.getElementsByClassName(className);
  }

  removeDropDownShowClass(elements: HTMLCollectionOf<Element>): void {
    elements[0].classList.remove('show');
    this.isAnyDropDownOpen = false;
  }

  addDropDownShowClass(elements: HTMLCollectionOf<Element>): void {
    elements[0].classList.add('show');
    this.isAnyDropDownOpen = true;
  }

  getActiveLabel(): void {
    this.activeItem$.subscribe((activeItem) => {
      this.items$.subscribe((items) => {
        items.forEach((item) => {
          if (item.isocode === activeItem) {
            this.activeLabel = item.label;
            if (item.nativeName) {
              this.activeFlag = item.hasOwnProperty('flag') && item.flag.url;
            }
          }
        });
      });
    });
  }
}
