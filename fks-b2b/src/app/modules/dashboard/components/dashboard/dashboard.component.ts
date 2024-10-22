import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {BaseSiteService, OccEndpointsService} from '@spartacus/core';
import {Observable} from 'rxjs';
import {FrankeDashboardService} from 'src/app/core/services/franke-dasboard/franke-dashboard.service';
import {TicketHistory} from 'src/app/shared/models/franke-ticket-history';
import {ExtendedBaseStore} from 'src/app/shared/models/misc';
import {UserAccountFacade} from '@spartacus/user/account/root';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  ticketHistory$: Observable<TicketHistory>;

  constructor(
    private dashboardService: FrankeDashboardService,
    private userAccountFacade: UserAccountFacade,
    private storeService: BaseSiteService,
    private http: HttpClient,
    private endpoint: OccEndpointsService
  ) {
  }

  ngOnInit(): void {
    this.userAccountFacade.get()
      .subscribe((user) => {
        this.ticketHistory$ = this.dashboardService.getTicketHistory(user.uid);
      })
      .unsubscribe();

    this.storeService.getActive().subscribe((store) => {
      this.http.get<ExtendedBaseStore>(this.endpoint.buildUrl(`/basestores/${store}`)).subscribe();
    });
  }
}
