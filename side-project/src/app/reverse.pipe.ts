import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "reverse",
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    if (value.length < 2) {
      return value;
    }
    const reversedArray = [];
    for (let i = value.length; i >= 0; i--) {
      reversedArray.push(value[i]);
    }
    return reversedArray.join("");
  }
}
