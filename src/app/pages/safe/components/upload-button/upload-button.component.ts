import {Component, computed, EventEmitter, inject, Output, signal, WritableSignal} from '@angular/core';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {FileUploadResponse} from '../../safe.models';
import {SafeService} from '../../safe.service';
import {SessionService} from '../../../../services/session.service';
import {FileSizePipe} from '../../../../pipes/file-size.pipe';
import {Subscription} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {PercentPipe} from '@angular/common';

type UploadState = 'waiting' | 'uploading' | 'processing';

interface Progress {
  completed: number;
  loaded: number;
  total: number;
}

export interface UploadOutcome {
  success: boolean;
  response?: FileUploadResponse;
  error?: Error;
}

@Component({
  selector: 'app-upload-button',
  standalone: true,
  imports: [
    FileSizePipe,
    FormsModule,
    PercentPipe
  ],
  templateUrl: './upload-button.component.html',
  styleUrl: './upload-button.component.scss'
})
export class UploadButtonComponent {
  state: WritableSignal<UploadState> = signal('waiting');
  progress = signal<Progress>({
    completed: 0,
    total: 0,
    loaded: 0
  });
  isModalActive = computed(() => ['uploading', 'processing'].includes(this.state()));
  @Output() onUpload = new EventEmitter<UploadOutcome>();

  file!: File;

  #service = inject(SafeService);
  #session = inject(SessionService);
  #uploadSubscription?: Subscription;

  onSelectFile($event: Event) {
    const file = ($event.target as HTMLInputElement).files!.item(0);
    if (file !== null) {
      this.#upload(file);
    }
    ($event.target as HTMLInputElement).value = '';
    this.progress.set({
      completed: 0, loaded: 0, total: 0
    });
  }

  onCancelClick() {
    this.#uploadSubscription?.unsubscribe();
    this.#uploadSubscription = undefined;
    this.#triggerOutcome(false);
  }

  #upload(file: File): void {
    this.#uploadSubscription = this.#service.upload(file).subscribe({
      error: (error: Error) => this.#triggerOutcome(false, undefined, error),
      next: (event: HttpEvent<FileUploadResponse>) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.#updateProgress(event.loaded, event.total!);
        } else if (event.type === HttpEventType.Response) {
          this.#triggerOutcome(true, event.body!);
        }
      }
    });
  }

  #updateProgress(loaded: number, total: number): void {
    const completed = 100 * loaded / total;
    this.progress.set({
      completed, loaded, total
    });
    if (completed < 100) {
      this.state.set('uploading');
    } else {
      this.state.set('processing');
    }
    this.#session.extend();
  }

  #triggerOutcome(success: boolean, response?: FileUploadResponse, error?: Error) {
    this.progress.set({
      completed: 0,
      total: 0,
      loaded: 0
    });
    this.state.set('waiting');
    this.onUpload.emit({success, response, error});
  }

}
