import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FrankeDashboardService} from 'src/app/core/services/franke-dasboard/franke-dashboard.service';
import {FrankeTicketHistoryService} from 'src/app/core/services/franke-ticket-history/franke-ticket-history.service';
import {TicketHistory} from 'src/app/shared/models/franke-ticket-history';
import {MediaBreakpoint, WindowSizeUtils} from 'src/app/shared/utils/window-size-utils';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.scss'],
  providers: [WindowSizeUtils],
})
export class TicketHistoryComponent implements OnInit {
  @Input() ticketHistory: TicketHistory;

  isTabletOrDesktop$ = this.windowSizeUtils.match(MediaBreakpoint.TABLET_OR_DESKTOP);
  hasTicketHistory$: Observable<boolean>;

  constructor(
    protected windowSizeUtils: WindowSizeUtils,
    private dashboardService: FrankeDashboardService,
    private frankeTicketHistoryService: FrankeTicketHistoryService
  ) {
  }

  ngOnInit(): void {
    this.hasTicketHistory$ = this.dashboardService.hasTicketHistory$;
  }

  getTicketType(name: string): string {
    return name.match(/\[.+?\]/g)
      ? name.match(/\[.+?\]/g)[0].slice(1, -1)
      : name.substring(0, 9) + (name.length > 9 ? '...' : '');
  }

  getTicketUserName(name: string): string {
    return name.match(/\[.+?\]/g)
      ? name.match(/\[.+?\]/g)[1].slice(1, -1)
      : name.substring(0, 9) + (name.length > 9 ? '...' : '');
  }

  parseDate(date: any): Date {
    return new Date(date.split('.').splice(0, 1));
  }

  getTicketUserNameInitials(name: string): string {
    return this.getTicketUserName(name) ? this.getTicketUserName(name).substring(0, 2).toUpperCase() : 'NA';
  }

  getTicketAvatarClassNameByUserLifecycleStatusCode(userLifecycleStatus: string): string {
    return this.frankeTicketHistoryService.getTicketAvatarClassNameByUserLifecycleStatusCode(userLifecycleStatus);
  }

  getTicketClassNameByUserLifecycleStatusCode(userLifecycleStatus: string): string {
    return this.frankeTicketHistoryService.getTicketClassNameByUserLifecycleStatusCode(userLifecycleStatus);
  }

  getTicketStatusTranslation(userLifecycleStatus: string): Observable<string> {
    return this.frankeTicketHistoryService.getTicketStatusTranslation(userLifecycleStatus);
  }
}
