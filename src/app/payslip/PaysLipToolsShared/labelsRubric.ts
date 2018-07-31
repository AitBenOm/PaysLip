export class LabelsRubric {


 public  nom: string;
  public proprety: string;
  public nbOrTaux: string;
  public libelle: string;
  public disabled: boolean;


  constructor(nom: string, proprety: string, nbOrTaux: string, libelle: string, disabled: boolean) {
    this.nom = nom;
    this.proprety = proprety;
    this.nbOrTaux = nbOrTaux;
    this.libelle = libelle;
    this.disabled = disabled;
  }


}
