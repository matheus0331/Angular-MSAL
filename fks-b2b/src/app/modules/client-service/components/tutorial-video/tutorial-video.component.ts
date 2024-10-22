import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {UserAccountFacade} from '@spartacus/user/account/root';

@Component({
  selector: 'app-tutorial-video',
  templateUrl: './tutorial-video.component.html',
  styleUrls: ['./tutorial-video.component.scss'],
})
export class TutorialVideoComponent implements OnInit {
  slidesPath =
    'body > app-root > cx-storefront > main > cx-page-layout > cx-page-slot.Section2.page-fold.has-components > app-tutorial-video > div.container > div.wrapper > app-franke-carousel > div.carousel-panel.size-1 > div';

  indicatorsPath =
    'body > app-root > cx-storefront > main > cx-page-layout > cx-page-slot.Section2.has-components > app-tutorial-video > div.container > div.wrapper > app-franke-carousel > div.indicators > button';

  items$: Observable<Observable<string>[]>;

  constructor(private sanitizer: DomSanitizer, private user: UserAccountFacade) {
  }

  ngOnInit(): void {
    this.user.get().subscribe((user) => {
      if (user.language.isocode === 'en_GB') {
        this.items$ = of([
          of('https://www.youtube.com/embed/JHMMpCAm8nw'),
          of('https://www.youtube.com/embed/MF3m_tJx0zQ'),
        ]);
      } else {
        this.items$ = of([
          of('https://www.youtube.com/embed/F7uMPI8IOh8'),
          of('https://www.youtube.com/embed/2jRRNt2SarQ'),
        ]);
      }
    });
  }

  sanitizeUrl(url): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
