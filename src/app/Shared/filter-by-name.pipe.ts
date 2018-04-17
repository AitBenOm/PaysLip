import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {


  transform(value: any, input: string, searchableList: any[]) {
    if (input) {
      input = input.toLowerCase();
      return value.filter(function (employee: any) {
        let isTrue = false;

        if (employee[searchableList[0]].toLowerCase().indexOf(input) > -1) {
          isTrue = true;
        } else if (employee[searchableList[1]].toLowerCase().indexOf(input) > -1) {
          isTrue = true;
        } else if (employee[searchableList[2]]===(Number(input))) {
          isTrue = true;
        }
        if (isTrue) {
          return employee;
        }

      });
    }else{
      return null;
    }

  }

}
