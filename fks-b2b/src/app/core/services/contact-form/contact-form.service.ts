import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {OccEndpointsService} from '@spartacus/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {ICategory} from 'src/app/shared/models/ContactFormCategories';
import {EventsTrackerService} from '@core/services/events-tracker/events-tracker.service';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  constructor(
    private http: HttpClient,
    private endpoint: OccEndpointsService,
    private eventsTrackerService: EventsTrackerService
  ) {
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.endpoint.buildUrl('ticketcategories?fields=DEFAULT'));
  }

  /** POST: add a new ticket to the database */
  addTicket(ticket): Observable<any> {
    this.eventsTrackerService.sendSubmitContactUsEvent();
    return this.http.post<any>(this.endpoint.buildUrl('users/current/contactus'), ticket)
      .pipe(catchError((err: HttpErrorResponse) => throwError(`An error occured in addTicket: ${JSON.stringify(err)}`)));
  }
}
