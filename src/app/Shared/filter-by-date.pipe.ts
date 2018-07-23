import {Pipe, PipeTransform} from '@angular/core';
import {PaysLip} from "../payslip/PaysLipToolsShared/PaysLip";

@Pipe({
  name: 'filterByDate'
})
export class FilterByDatePipe implements PipeTransform {


  transform(value: any, input: string) {
    console.log(input);
 const choosenDate = new Date(input);
    if (input) {

      return value.filter(function (paysLip: PaysLip) {
        let isTrue = false;
        console.log(choosenDate);
        console.log(paysLip.startPeriod.getFullYear());
        console.log(paysLip.startPeriod.getMonth());
        if (choosenDate.getFullYear() === paysLip.startPeriod.getFullYear() &&
          choosenDate.getMonth() === paysLip.startPeriod.getMonth()) {
          isTrue = true;
        }
        if (isTrue) {
          return paysLip;
        }

      });
    }
return value;
  }
}
