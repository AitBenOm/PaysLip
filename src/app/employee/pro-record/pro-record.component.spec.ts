import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProRecordComponent } from './pro-record.component';

describe('ProRecordComponent', () => {
  let component: ProRecordComponent;
  let fixture: ComponentFixture<ProRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
