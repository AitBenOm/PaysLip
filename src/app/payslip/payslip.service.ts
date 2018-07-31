import {EventEmitter, Injectable} from '@angular/core';
import {EmployeeModel} from '../employee/employee-model';
import {LabelsRubric} from './PaysLipToolsShared/labelsRubric';
import {PaysLip} from './PaysLipToolsShared/PaysLip';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Rubric} from './PaysLipToolsShared/rubric';


@Injectable()
export class PayslipService {
  onGenerateAllPaysLip = new Subject<boolean>();
  paysLipsGenerated = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
  }

  paysLipsOfEmployee: PaysLip[] = [];
  allPaysLips: PaysLip[] = [];

  onAddPaysLip = new Subject<PaysLip>();
  listRubrique: LabelsRubric[] = [
    new LabelsRubric('Salaire de base', 'GAIN', 'nb', 'SDB', true),

    new LabelsRubric('Ancienté', 'GAIN', 'tx', 'ANT', true),
    new LabelsRubric('Indem.Deplacement', 'GAIN', 'nb', 'INDTR', false),
    new LabelsRubric('Indem.Representation', 'GAIN', 'nb', 'INDRE', false),
    new LabelsRubric('Prime Transport', 'GAIN', 'nb', 'PRITR', false),
    new LabelsRubric('Prime Panier', 'GAIN', 'nb', 'PRIPAN', false),
    new LabelsRubric('A.M.O', 'RET', 'tx', 'AMO', true),
    new LabelsRubric('C.N.S.S', 'RET', 'tx', 'CNSS', true),
    new LabelsRubric('Taxe Profesionelle', 'RET', 'tx', 'TXPRO', true),
    new LabelsRubric('Personnes a Charge', 'RET', 'nb', 'PRCHG', true),
    new LabelsRubric('I.G.R', 'RET', 'tx', 'IGR', true),

    new LabelsRubric('ARRONDI', 'GAIN', 'nb', 'ARR', true)
  ];
  labelsVariabls: any
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
      'PRCHG': {
        'B': 'PRCHG_B',
        'T': 'PRCHG_T',
        'G': 'PRCHG_G',
        'R': 'PRCHG_R',
      },
      'TXPRO': {
        'B': 'TXPRO_B',
        'T': 'TXPRO_T',
        'G': 'TXPRO_G',
        'R': 'TXPRO_R',
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
  rubricsTitles: any
    =
    {
      'SDB': 'Salaire de Base',
      'ANT': 'Ancienté',
      'CNSS': 'C.N.S.S',
      'AMO': 'A.M.O',
      'IGR': 'I.G.R',
      'ARR': 'Arrondie',
      'INDTR': 'Indem.Deplacement',
      'PRITR': '  Prime de Transport',
      'PRIPAN': 'Prime de Panier',
      'INDRE': 'Indem . Rpresentation',
      'TXPRO': 'Taxe . Professionelle',
      'PRCHG': 'Personnes a Charge',
    };

  addPaysLip(paysLip: PaysLip) {
    return this.http.post('http://localhost:9080/PaysLip/Add', paysLip);

  }

  addRubricsToPaysLip(rubrics: Rubric[]) {
    return this.http.post('http://localhost:9080/Rubric/Add', rubrics);

  }

  getPaysLipByEmployee(matricule: number) {
    return this.http.get('   http://localhost:9080/PaysLip/List?matricule=' + matricule);

  }

  getRubricsByPaysLip(idPaysLip: number) {
    return this.http.get('   http://localhost:9080/Rubric/List/' + idPaysLip);

  }

  printPaysLip(idPaysLip: number, matricule: number) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/pdf'
    });

    return this.http.get('   http://localhost:9080/PaysLip/print?idPaysLip=' + idPaysLip + '&matricule=' + matricule,
      {headers: new HttpHeaders({'Content-Type': 'application/json'}), responseType: 'blob'});

  }
}
