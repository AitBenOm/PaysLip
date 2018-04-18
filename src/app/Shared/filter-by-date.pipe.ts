import {Pipe, PipeTransform} from '@angular/core';
import {PaysLip} from "../payslip/PaysLipToolsShared/pays-lip";

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
        console.log(paysLip.period[0].getFullYear());
        console.log(paysLip.period[0].getMonth());
        if (choosenDate.getFullYear() === paysLip.period[0].getFullYear() &&
          choosenDate.getMonth() === paysLip.period[0].getMonth()) {
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
