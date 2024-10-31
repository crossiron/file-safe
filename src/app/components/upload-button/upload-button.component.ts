import {Component, computed, EventEmitter, inject, Output, signal, WritableSignal} from '@angular/core';
import {SafeService} from '../../pages/safe/safe.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-upload-button',
  standalone: true,
  imports: [],
  templateUrl: './upload-button.component.html',
  styleUrl: './upload-button.component.scss'
})
export class UploadButtonComponent {
  #service = inject(SafeService);
  #currentFile?: File;

  progress: WritableSignal<number> = signal(0);
  isModalActive = computed(() => this.progress() > 0);

  @Output()
  uploaded = new EventEmitter<boolean>();

  selectFile($event: any) {
    this.progress.set(0);
    this.#currentFile = $event.target?.files.item(0);
    this.#upload();
  }

  #upload(): void {
    if (this.#currentFile === undefined) {
      return;
    }

    this.progress.set(1);

    this.#service.upload(this.#currentFile).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.set(Math.round(100 * event.loaded / event.total));
        } else if (event instanceof HttpResponse) {
          this.#reset();
          this.uploaded.emit(true);
        }
      },
      error: () => {
        this.#reset();
        this.uploaded.emit(false);
      },
      complete: () => {
        this.#reset();
      }
    });
  }

  #reset() {
    this.progress.set(0);
    this.#currentFile = undefined;
  }
}
