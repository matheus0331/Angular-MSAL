import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {OccEndpointsService} from '@spartacus/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Statistics} from 'src/app/shared/models/statistics';

@Injectable({providedIn: 'root'})
export class FrankeDashboardService {
  constructor(private http: HttpClient, private occEndpointService: OccEndpointsService) {
  }

  // tslint:disable-next-line: variable-name
  private _hasTicketHistory$ = new BehaviorSubject<boolean>(false);

  get hasTicketHistory$(): Observable<boolean> {
    return this._hasTicketHistory$.asObservable();
  }

  getTicketHistory(uid: string): Observable<any> {
    this._hasTicketHistory$.next(true);

    return this.http.get<Statistics>(this.occEndpointService.buildUrl('/users/' + uid + '/tickethistory'))
      .pipe(
        catchError(() => {
          this._hasTicketHistory$.next(false);
          return of({});
        })
      );
  }
}
