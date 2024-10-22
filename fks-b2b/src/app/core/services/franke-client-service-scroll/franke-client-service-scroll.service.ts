import {Injectable} from '@angular/core';
import {RoutingService, WindowRef} from '@spartacus/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FrankeClientServiceScrollService {
  formOptions: BehaviorSubject<string>;
  routingServiceSub: Subscription;

  constructor(
    private winRef: WindowRef,
    public routingService: RoutingService
  ) {
    this.formOptions = new BehaviorSubject<string>('');
  }

  activateScroll(url: string, section: string, formOptions?: string): void {
    url === '/client-service'
      ? this.scrollAlreadyOnPage(section, formOptions)
      : this.scrollToPage(section, formOptions);
  }

  scrollAlreadyOnPage(section: string, formOptions?: string): void {
    const target = this.winRef.document.getElementsByClassName(section);
    target[0].scrollIntoView({behavior: 'smooth'});
    this.setFormOptions(formOptions);
  }

  scrollToPage(section: string, formOptions?: string): void {
    this.routingServiceSub = this.routingService
      .getRouterState()
      .pipe(distinctUntilChanged())
      .subscribe((route) => {
        if (route?.state?.context?.id === '/client-service') {
          setTimeout(() => {
            const target = this.winRef.document.getElementsByClassName(section);
            target[0].scrollIntoView({behavior: 'smooth'});
            this.setFormOptions(formOptions);
            this.routingServiceSub.unsubscribe();
          }, 1000);
        }
      });
  }

  public getFormOptions(): Observable<string> {
    return this.formOptions.asObservable();
  }

  public setFormOptions(formOptions: string): void {
    this.formOptions.next(formOptions);
  }
}
