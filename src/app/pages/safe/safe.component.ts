import {Component, computed, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {Observable} from 'rxjs';
import {SafeModel} from './safe.model';
import {FileSizePipe} from '../../pipes/file-size.pipe';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';
import {DatePipe} from '@angular/common';
import {HeaderComponent} from '../../components/header/header.component';

@Component({
  selector: 'app-safe',
  standalone: true,
  imports: [
    FileSizePipe,
    TimeAgoPipe,
    DatePipe,
    RouterLink,
    HeaderComponent,
  ],
  templateUrl: './safe.component.html',
  styleUrl: './safe.component.scss'
})
export class SafeComponent {
  #model = toSignal((inject(ActivatedRoute).data as Observable<SafeModel>));
  files = computed(() => this.#model()?.list.files);
  error = computed(() => this.#model()?.list.error);
}
