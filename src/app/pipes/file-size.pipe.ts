import {Pipe, PipeTransform} from '@angular/core';
import prettyBytes from 'pretty-bytes';

@Pipe({
  name: 'fileSize',
  standalone: true
})
export class FileSizePipe implements PipeTransform {
  transform(value: number): unknown {
    return prettyBytes(value);
  }
}
