import {Injectable} from '@angular/core';
import {EmployeeModel} from '../employee/employee-model';
import {LabelsRubric} from './PaysLipToolsShared/labelsRubric';
import {PaysLip} from "./PaysLipToolsShared/pays-lip";
import {Subject} from "rxjs/Subject";

@Injectable()
export class PayslipService {

  constructor() {
  }

  onAddPaysLip = new Subject<PaysLip>();
  listRubrique: LabelsRubric[] = [
    new LabelsRubric('Salaire de base', 'GAIN', 'nb', 'SDB'),

    new LabelsRubric('Ancienté', 'GAIN', 'tx', 'ANT'),
    new LabelsRubric('Indem.Deplacement', 'GAIN', 'nb', 'INDTR'),
    new LabelsRubric('Indem.Representation', 'GAIN', 'nb', 'INDRE'),
    new LabelsRubric('Prime Transport', 'GAIN', 'nb', 'PRITR'),
    new LabelsRubric('Prime Panier', 'GAIN', 'nb', 'PRIPAN'),
    new LabelsRubric('A.M.O', 'RET', 'tx', 'AMO'),
    new LabelsRubric('C.N.S.S', 'RET', 'tx', 'CNSS'),
    new LabelsRubric('I.G.R', 'RET', 'tx', 'IGR'),
    new LabelsRubric('ARRONDI', 'GAIN', 'nb', 'ARR')
  ];
  labels: any
    =
    {
      'SDB': {
        'B': 'SDB_B',
        'T': 'SDB_T',
        'G': 'SDB_G',
        'R': 'SDB_R',
      },
      'ANT': {
        'B': 'ANT_B',
        'T': 'ANT_T',
        'G': 'ANT_G',
        'R': 'ANT_R',
      },
      'INDTR': {
        'B': 'INDTR_B',
        'T': 'INDTR_T',
        'G': 'INDTR_G',
        'R': 'INDTR_R',
      },
      'INDRE': {
        'B': 'INDRE_B',
        'T': 'INDRE_T',
        'G': 'INDRE_G',
        'R': 'INDRE_R',
      },
      'PRITR': {
        'B': 'PRITR_B',
        'T': 'PRITR_T',
        'G': 'PRITR_G',
        'R': 'PRITR_R',
      },
      'PRIPAN': {
        'B': 'PRIPAN_B',
        'T': 'PRIPAN_T',
        'G': 'PRIPAN_G',
        'R': 'PRIPAN_R',
      },
      'AMO': {
        'B': 'AMO_B',
        'T': 'AMO_T',
        'G': 'AMO_G',
        'R': 'AMO_R',
      },
      'CNSS': {
        'B': 'CNSS_B',
        'T': 'CNSS_T',
        'G': 'CNSS_G',
        'R': 'CNSS_R',
      },
      'IGR': {
        'B': 'IGR_B',
        'T': 'IGR_T',
        'G': 'IGR_G',
        'R': 'IGR_R',
      },
      'ARR': {
        'B': 'ARR_B',
        'T': 'ARR_T',
        'G': 'ARR_G',
        'R': 'ARR_R',
      },
    };


  paysLips: PaysLip[]=[

    ]


}
