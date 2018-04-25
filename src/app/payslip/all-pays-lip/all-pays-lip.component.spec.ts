import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPaysLipComponent } from './all-pays-lip.component';

describe('AllPaysLipComponent', () => {
  let component: AllPaysLipComponent;
  let fixture: ComponentFixture<AllPaysLipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPaysLipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPaysLipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
