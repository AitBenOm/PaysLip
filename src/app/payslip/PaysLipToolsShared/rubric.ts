export class Rubric {
  public label: string;
  public  rate : number;
  public Property: boolean;
  public value : number;
  public base : number;


  constructor(label: string, rate: number, Property: boolean, value: number, base: number) {
    this.label = label;
    this.rate = rate;
    this.Property = Property;
    this.value = value;
    this.base = base;
  }
}
