import {Component, effect, inject, Renderer2} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SessionService} from './services/session.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  #renderer = inject(Renderer2);
  #session = inject(SessionService);
  #disposeClickHandler ?: () => void;

  constructor() {
    effect(() => {
      const isLoggedIn = this.#session.isLoggedIn();
      if (isLoggedIn) {
        if (this.#disposeClickHandler === undefined) {
          this.#disposeClickHandler = this.#renderer.listen('window', 'pointerdown', _ => this.#session.extend());
        }
      } else {
        this.#disposeClickHandler?.();
        this.#disposeClickHandler = undefined;
      }
    });
  }
}
