import {Pipe, PipeTransform} from '@angular/core';
import {PaysLip} from '../payslip/PaysLipToolsShared/PaysLip';

@Pipe({
  name: 'filterByDate'
})
export class FilterByDatePipe implements PipeTransform {


  transform(paysLips: PaysLip[], year: number, month: number) {

    const inputDate = new Date(year, month);


    if (paysLips.length !== 0 && year != 0) {
      let paysLipsDate: PaysLip [] = [];
      console.log('Enter Loop');
      console.log('===========================================');

      for (const paysLip of paysLips) {
        const startPeriode = new Date(paysLip.startPeriod);
        console.log('PaysLip Start Periode Month ' + (startPeriode.getMonth() + 1));
        console.log('input Month ' + inputDate.getMonth());
        if (startPeriode.getFullYear() === inputDate.getFullYear()) {
          if ((startPeriode.getMonth()) + 1 === inputDate.getMonth() && month != 0) {
            paysLipsDate = [];
            paysLipsDate.push(paysLip);

            break;
          }

          paysLipsDate.push(paysLip);
        }
      }

      return paysLipsDate;

    } else {
      console.log(year);
      return paysLips;
    }
  }
}
