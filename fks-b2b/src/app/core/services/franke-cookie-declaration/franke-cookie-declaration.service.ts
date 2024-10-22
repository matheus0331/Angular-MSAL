import {Injectable} from '@angular/core';
import {LanguageService, RoutingService} from '@spartacus/core';
import {distinctUntilChanged} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FrankeCookieDeclarationService {
  script: any;

  private browserGlobals = {
    windowRef(): any {
      return typeof window !== 'undefined' ? window : {};
    },
    documentRef(): any {
      return typeof document !== 'undefined' ? document : {};
    },
  };

  constructor(
    protected routing: RoutingService,
    private languageService: LanguageService
  ) {
    this.routing
      .getRouterState()
      .pipe(distinctUntilChanged())
      .subscribe((state) => {
        if (state.state.context.id === '/privacy') {
          if (!this.script) {
            this.addScript();
          }
        } else {
          if (this.script) {
            this.removeScript();
          }
        }
      });
  }

  addScript(): void {
    let language = 'en';
    this.languageService
      .getActive()
      .subscribe(
        (selectedLanguage) => (language = selectedLanguage.split('_')[0])
      );

    const doc = this.browserGlobals.documentRef();
    const cookieScript = doc.createElement('script') as HTMLScriptElement;
    cookieScript.id = 'CookieDeclaration';
    cookieScript.async = true;
    cookieScript.type = 'text/javascript';
    cookieScript.charset = 'UTF-8';
    cookieScript.setAttribute('data-culture', language);
    cookieScript.src =
      'https://consent.cookiebot.com/58873f5b-196f-4c4b-aa52-a0e515774455/cd.js';
    this.script = cookieScript;
    doc.head.appendChild(cookieScript);
  }

  removeScript(): void {
    const doc = this.browserGlobals.documentRef();
    doc.head.removeChild(doc.head.firstChild);
    doc.head.removeChild(this.script);
    this.script = undefined;
  }
}
