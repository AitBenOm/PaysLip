import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {


  transform(value: any, input: string, searchableList: any[]) {
    if (input) {
      input = input.toLowerCase();
      return value.filter(function (el: any) {
        let isTrue = false;

        if (el[searchableList[0]].toLowerCase().indexOf(input) > -1) {
          isTrue = true;
        }else if (el[searchableList[1]].toLowerCase().indexOf(input) > -1) {
          isTrue = true;
        }
        if (isTrue) {
          return el
        }

      })
    }
    return value;
  }

}
