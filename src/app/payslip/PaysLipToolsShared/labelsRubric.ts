export class LabelsRubric {


  private _nom: string;
  private _proprety: string;
  private _nbOrTaux: string;
  private _libelle: string;
  private _disabled: boolean;


  constructor(nom: string, proprety: string, nbOrTaux: string, libelle: string, disabled: boolean) {
    this._nom = nom;
    this._proprety = proprety;
    this._nbOrTaux = nbOrTaux;
    this._libelle = libelle;
    this._disabled = disabled;
  }


  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
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
