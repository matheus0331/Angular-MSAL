import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TranslationService} from '@spartacus/core';
import {TicketsStatusCodeEnum} from 'src/app/shared/models/franke-ticket-history';

@Injectable({
  providedIn: 'root',
})
export class FrankeTicketHistoryService {

  constructor(private translation: TranslationService) {
  }

  getTicketStatusByUserLifecycleStatus(userLifecycleStatus: string): string {
    switch (userLifecycleStatus) {
      case '1':
        return TicketsStatusCodeEnum.Open;
      case '2':
      case 'Z2':
      case 'Z3':
      case 'Z4':
      case 'Z1':
        return TicketsStatusCodeEnum.InProgress;
      case '5':
      case 'Z5':
        return TicketsStatusCodeEnum.Completed;
      case '4':
        return TicketsStatusCodeEnum.CustomerAction;
      default:
        return '';
    }
  }

  getTicketAvatarClassNameByUserLifecycleStatusCode(userLifecycleStatus: string): string {
    const ticketStatus: string = this.getTicketStatusByUserLifecycleStatus(userLifecycleStatus);
    switch (ticketStatus) {
      case TicketsStatusCodeEnum.InProgress:
        return 'avatar-status-in-process';
      case TicketsStatusCodeEnum.Completed:
        return 'avatar-status-completed';
      case TicketsStatusCodeEnum.CustomerAction:
        return 'avatar-status-customer-action';
      default:
        return 'avatar-status-open';
    }
  }

  getTicketClassNameByUserLifecycleStatusCode(userLifecycleStatus: string): string {
    const ticketStatus: string = this.getTicketStatusByUserLifecycleStatus(userLifecycleStatus);
    switch (ticketStatus) {
      case TicketsStatusCodeEnum.InProgress:
        return 'status-in-process';
      case TicketsStatusCodeEnum.Completed:
        return 'status-completed';
      case TicketsStatusCodeEnum.CustomerAction:
        return 'status-customer-action';
      default:
        return 'status-open';
    }
  }

  getTicketStatusTranslation(userLifecycleStatus: string): Observable<string> {
    const ticketStatus: string = this.getTicketStatusByUserLifecycleStatus(userLifecycleStatus);
    switch (ticketStatus) {
      case TicketsStatusCodeEnum.InProgress:
        return this.translation.translate('dashboard.ticketHistoryStatusInProcess');
      case TicketsStatusCodeEnum.Completed:
        return this.translation.translate('dashboard.ticketHistoryStatusCompleted');
      // No translation for CustomerAction, will be reverted to Open
      // case TicketsStatusCodeEnum.CustomerAction:
      //   return this.translation.translate('dashboard.');
      default:
        return this.translation.translate('dashboard.ticketHistoryStatusOpen');
    }
  }
}
