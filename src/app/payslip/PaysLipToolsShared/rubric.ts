import {PaysLip} from './PaysLip';

export class Rubric {
  public idRubric : number;
  public label: string;
  public  rate : number;
  public  rateType : string;
  public Property: boolean;
  public value : number;
  public base : number;
  public paysLip: PaysLip


  constructor(label: string, rate: number, rateType: string, Property: boolean, value: number, base: number, paysLip: PaysLip) {
    this.label = label;
    this.rate = rate;
    this.rateType = rateType;
    this.Property = Property;
    this.value = value;
    this.base = base;
    this.paysLip = paysLip;
  }
}
