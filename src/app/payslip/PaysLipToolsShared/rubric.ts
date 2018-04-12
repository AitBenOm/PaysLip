export class Rubric {
  public label: string;
  public  rate : number;
  public Property: boolean;
  public value : number;


  constructor(libelle: string, rate: number, Property: boolean, value: number) {
    this.label = libelle;
    this.rate = rate;
    this.Property = Property;
    this.value = value;
  }
}
