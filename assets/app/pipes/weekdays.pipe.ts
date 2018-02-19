import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'weekdays'})
export class Weekdays implements PipeTransform {
  transform(value: string): string {
    let newStr: string = "";
    value = value.replace(/^,|,$/g,'');
    let arr = value.split(',');
    if(arr.length == 2 && arr.indexOf('Sun') !== -1 && arr.indexOf('Sat') !== -1) {
    	newStr = 'Weekends';
    } else if(arr.length == 7) {
    	newStr = 'Every day';
    } else if(arr.length == 5 && arr.indexOf('Sun') == -1 && arr.indexOf('Sat') == -1) {
    	newStr = 'Week days';
    } else {
    	newStr = value.replace(/^,|,$/g,'');
    }
    return newStr;
  }
}