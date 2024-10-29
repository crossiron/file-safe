import {Component, inject, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-safe',
  standalone: true,
  imports: [],
  templateUrl: './safe.component.html',
  styleUrl: './safe.component.scss'
})
export class SafeComponent implements OnInit, OnDestroy {
  #renderer = inject(Renderer2);
  #session = inject(SessionService);
  #unlisten?: () => void;

  constructor() {
  }

  ngOnInit(): void {
    this.#unlisten = this.#renderer.listen('window', 'click', _ => this.#session.extend());
  }

  ngOnDestroy(): void {
    if (this.#unlisten) {
      this.#unlisten();
    }
  }
}
