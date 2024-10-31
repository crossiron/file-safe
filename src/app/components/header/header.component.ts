import {Component, inject} from '@angular/core';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  #session = inject(SessionService);

  logout() {
    this.#session.logout();
  }
}
