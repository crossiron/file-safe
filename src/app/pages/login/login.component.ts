import {Component, inject} from '@angular/core';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';
import {ROUTE_SEGMENT_SAFE} from '../../app.routes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  #storage = inject(SessionService);
  #router = inject(Router);

  async login() {
    this.#storage.extend();
    await this.#router.navigate(ROUTE_SEGMENT_SAFE);
  }
}
