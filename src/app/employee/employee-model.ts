export class EmployeeModel {
  public matricule: number;
  public nom: string;
  public prenom: string;
  public date_de_naissance: Date;
  public date_emb: Date;
  public fonction: string;
  public adresse: string;
  public telephone: string;
  public email:string;
  public numCNSS: string;
  public numCin: string;
  public sex: string;
  public situationFamiliale: string;
  public nbEnfant: number;
  public salaireDeBase: number;


  constructor(matricule: number, nom: string, prenom: string, date_de_naissance: Date, date_emb: Date, fonction: string, adresse: string, telephone: string, email: string, numCNSS: string, numCin: string, sex: string, situationFamiliale: string, nbEnfant: number, salaireDeBase: number) {
    this.matricule = matricule;
    this.nom = nom;
    this.prenom = prenom;
    this.date_de_naissance = date_de_naissance;
    this.date_emb = date_emb;
    this.fonction = fonction;
    this.adresse = adresse;
    this.telephone = telephone;
    this.email = email;
    this.numCNSS = numCNSS;
    this.numCin = numCin;
    this.sex = sex;
    this.situationFamiliale = situationFamiliale;
    this.nbEnfant = nbEnfant;
    this.salaireDeBase=salaireDeBase;
  }
}
