import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string): string {
    const reversed = "";
    for(let i = 0; i < value.length; i++ ) {
      reversed[i] == value[value.length - 1 - i];
    }
    return reversed;
  }

}
