import {Component} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})

export class ChatComponent {
  showOptions = false;

  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }
}
