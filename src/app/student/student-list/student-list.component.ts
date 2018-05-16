import {Component, OnInit} from '@angular/core';
import {StudentModel} from "../student.model";
import {StudentService} from "../student.service";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(private studentService: StudentService) {
  }
  hideListe: boolean = true;
  students: StudentModel[];

  ngOnInit() {
    this.students = this.studentService.getListStudent();
  }

}
