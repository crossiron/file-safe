import {Component, inject} from '@angular/core';
import {SessionService} from '../../services/session.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    #session = inject(SessionService);

    async login() {
        this.#session.login();
    }
}
