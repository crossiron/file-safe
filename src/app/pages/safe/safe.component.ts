import {Component, computed, inject, Signal, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FileSizePipe} from '../../pipes/file-size.pipe';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';
import {DatePipe} from '@angular/common';
import {HeaderComponent} from '../../components/header/header.component';
import {UploadButtonComponent, UploadOutcome} from './components/upload-button/upload-button.component';
import {FilesListComponent} from './components/files-list/files-list.component';
import {NotificationComponent} from '../../components/notification/notification.component';
import {Notification} from '../../models/notification.model';
import {fromResolver} from './safe.resolver';
import {ResolvedSafeModel, SafeFile} from './safe.models';

@Component({
  selector: 'app-safe',
  standalone: true,
  imports: [
    FileSizePipe,
    TimeAgoPipe,
    DatePipe,
    RouterLink,
    HeaderComponent,
    UploadButtonComponent,
    FilesListComponent,
    NotificationComponent,
  ],
  templateUrl: './safe.component.html',
  styleUrl: './safe.component.scss'
})
export class SafeComponent {
  uploadNotification: WritableSignal<Notification | undefined> = signal<Notification | undefined>(undefined);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  #resolverModel = fromResolver<ResolvedSafeModel>(this.#route, 'model', {
    files: [],
    filesError: undefined
  });
  files: Signal<SafeFile[]> = computed(() => this.#resolverModel().files);
  filesError: Signal<Notification<"danger"> | undefined> = computed(() => this.#resolverModel().filesError);

  onUpload($event: UploadOutcome) {
    if ($event.success) {
      this.uploadNotification.set({
        type: 'success',
        message: $localize`:@@pages.safe.notifications.uploadSuccess:File uploaded successfully!`
      });
      return void this.#router.navigate([], {
        relativeTo: this.#route,
        queryParamsHandling: 'preserve',
        onSameUrlNavigation: 'reload',
      });
    }

    if ($event.error) {
      this.uploadNotification.set({
        type: 'danger',
        message: $localize`:@@pages.safe.notifications.uploadFailed:File upload failed`
      });
    }
  }
}
