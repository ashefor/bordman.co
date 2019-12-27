import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: any): any {
    const now = new Date();
    const currentTime = new Date(value);
    const timePipe = ((+now - +currentTime) / 1000);
    const timeIntervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    };
    let counter;
    if (value) {
      if (timePipe < 29) {
        return 'Just now';
      } else {
        // tslint:disable-next-line
        for (const time in timeIntervals) {
          counter = Math.floor(timePipe / timeIntervals[time]);
          if (counter > 0) {
            if (counter === 1) {
              return `${counter} ${time} ago`;
            } else {
              return `${counter} ${time}s ago`;
            }
          }
        }
      }// tslint:disable-next-line
    } return value;
  }

}
