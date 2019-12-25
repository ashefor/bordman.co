import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcDate'
})
export class UtcDatePipe implements PipeTransform {

  transform(value: string): any {
    if (value) {
      // const newvalue = value.split('+');
      const newtime = value.split(':').slice(0, -1).join(':');
      return newtime;
    } else {
      return null;
    }
  }

}
