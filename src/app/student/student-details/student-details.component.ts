import { Component, OnInit } from '@angular/core';
import {StudentModel} from "../student.model";
import {ActivatedRoute, Params} from "@angular/router";
import {StudentService} from "../student.service";
import {EmployeeService} from "../../employee/employee.service";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private studentService: StudentService, private employeeService: EmployeeService) { }


  student: StudentModel = null;

  ngOnInit() {


    console.log("details componnent");

    this.route.params.subscribe(
      (params: Params) => {
        this.student = this.studentService.getStudentbyMumEtudiant(params['id']);
        console.log("routes changed");
        this.employeeService.onKewWordChanged.next(this.student.nom);
        this.studentService.studentToShow.next(this.student);
      }
    );

    // console.log(this.employee);
  }


}
