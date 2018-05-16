import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StudentModel} from "../student.model";
import {StudentService} from "../student.service";
import {EmployeeService} from "../../employee/employee.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(private studentService: StudentService, private employeeService: EmployeeService, private router: Router) {
  }
  hideListe: boolean = true;
  students: StudentModel[];
  keyWord: string;
  @Output() studentSelected = new EventEmitter<StudentModel>();
  searchableField = [
    'nom', 'prenom', 'numEtudiant'
  ];

  ngOnInit() {
    this.students = this.studentService.getListStudent();
    this.employeeService.onKewWordChanged.subscribe(
      (data: string) => {
        this.keyWord = data;
      }
    );
  }

  onSearch() {
    this.employeeService.onKewWordChanged.emit(this.keyWord);
  }
  cleanUpInput() {
    this.keyWord = '';
    this.employeeService.onKewWordChanged.next('');
    this.router.navigate(['student-list']);
    // console.log((this.router.url).split('/'));
  }
  getStudent(student: StudentModel) {
    console.log(student);
    this.keyWord = student.nom;
    this.studentSelected.emit(student);

  }
}
