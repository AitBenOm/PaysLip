import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaysLipComponent } from './view-pays-lip.component';

describe('ViewPaysLipComponent', () => {
  let component: ViewPaysLipComponent;
  let fixture: ComponentFixture<ViewPaysLipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPaysLipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPaysLipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
