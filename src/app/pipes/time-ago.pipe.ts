import {Pipe, PipeTransform} from '@angular/core';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  formatter = new TimeAgo('en');

  transform(value: Date | string): string {
    const dateValue = value instanceof Date ? value : new Date(value);
    return this.formatter.format(dateValue.getTime(), 'round-minute');
  }
}
