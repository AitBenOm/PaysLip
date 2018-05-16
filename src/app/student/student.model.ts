export class StudentModel {
  public numEtudiant: number;
  public nom: string;
  public prenom: string;
  public date_de_naissance: Date;
  public adresse: string;
  public contacts: string[];
  public email: string;
  public sex: string;
  public level: string;


  constructor(numEtudiant: number, nom: string, prenom: string, date_de_naissance: Date, adresse: string, contacts: string[], email: string, sex: string, level: string) {
    this.numEtudiant = numEtudiant;
    this.nom = nom;
    this.prenom = prenom;
    this.date_de_naissance = date_de_naissance;
    this.adresse = adresse;
    this.contacts = contacts;
    this.email = email;
    this.sex = sex;
    this.level = level;
  }
}
