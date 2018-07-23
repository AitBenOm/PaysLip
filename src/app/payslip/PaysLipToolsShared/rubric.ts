import {PaysLip} from './PaysLip';

export class Rubric {
  public idRubric : number;
  public label: string;
  public  rate : number;
  public Property: boolean;
  public value : number;
  public base : number;
  public paysLip: PaysLip


  constructor(label: string, rate: number, Property: boolean, value: number, base: number, paysLip: PaysLip) {
    this.label = label;
    this.rate = rate;
    this.Property = Property;
    this.value = value;
    this.base = base;
    this.paysLip = paysLip;
  }
}
