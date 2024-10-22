import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';

import {FrankeClientServiceScrollService} from '@core/services/franke-client-service-scroll/franke-client-service-scroll.service';

@Component({
  selector: 'app-support-chat',
  templateUrl: './support-chat.component.html',
  styleUrls: ['./support-chat.component.scss'],
})
export class SupportChatComponent {
  @Output() closeChat = new EventEmitter();

  constructor(
    private router: Router,
    private clientServiceScrollService: FrankeClientServiceScrollService
  ) {
  }

  handleClick(): void {
    this.closeChat.emit();
  }

  scrollToClientServiceFromContact(): void {
    this.clientServiceScrollService.activateScroll(
      this.router.url,
      'scroll-section-contact-form',
      'TT-INQ'
    );
    this.closeChat.emit();
  }

  scrollToClientServiceFromQuestions(): void {
    this.clientServiceScrollService.activateScroll(
      this.router.url,
      'scroll-section-faq'
    );
    this.closeChat.emit();
  }

  scrollToClientServiceFromComplaint(): void {
    this.clientServiceScrollService.activateScroll(
      this.router.url,
      'scroll-section-contact-form',
      'TT-CP'
    );
    this.closeChat.emit();
  }
}
