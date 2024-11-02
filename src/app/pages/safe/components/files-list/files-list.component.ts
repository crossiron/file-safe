import {Component, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FileSizePipe} from '../../../../pipes/file-size.pipe';
import {TimeAgoPipe} from '../../../../pipes/time-ago.pipe';
import {SafeFile} from '../../safe.models';

@Component({
  selector: 'app-files-list',
  standalone: true,
  imports: [
    DatePipe,
    FileSizePipe,
    TimeAgoPipe,
  ],
  templateUrl: './files-list.component.html',
  styleUrl: './files-list.component.scss'
})
export class FilesListComponent {
  files = input.required<SafeFile[]>();
}
