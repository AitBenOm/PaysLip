import {Component, Input, OnInit} from '@angular/core';
import {StudentModel} from "../student.model";

@Component({
  selector: 'app-student-infos',
  templateUrl: './student-infos.component.html',
  styleUrls: ['./student-infos.component.css']
})
export class StudentInfosComponent implements OnInit {

  constructor() {
  }

  @Input() student: StudentModel = null;

  ngOnInit() {
  }

}
