export class LabelsRubric {


  private _nom: string;
  private _proprety: string;
  private _nbOrTaux: string;
  private _libelle: string;
  public labels: any= {
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



  constructor(nom: string, proprety: string, nbOrTaux: string, libelle: string) {
    this._nom = nom;
    this._proprety = proprety;
    this._nbOrTaux = nbOrTaux;
    this._libelle = libelle;
  }


  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get proprety(): string {
    return this._proprety;
  }

  set proprety(value: string) {
    this._proprety = value;
  }

  get nbOrTaux(): string {
    return this._nbOrTaux;
  }

  set nbOrTaux(value: string) {
    this._nbOrTaux = value;
  }

  get libelle(): string {
    return this._libelle;
  }

  set libelle(value: string) {
    this._libelle = value;
  }
}
