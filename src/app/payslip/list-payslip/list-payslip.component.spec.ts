import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPayslipComponent } from './list-payslip.component';

describe('ListPayslipComponent', () => {
  let component: ListPayslipComponent;
  let fixture: ComponentFixture<ListPayslipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPayslipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPayslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
