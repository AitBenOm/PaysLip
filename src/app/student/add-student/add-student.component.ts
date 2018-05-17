import {Component, Input, OnInit} from '@angular/core';
import {StudentModel} from "../student.model";
import {Level} from "../level";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StudentService} from "../student.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {


  listLevel: Level[];
  studentForm: FormGroup;
  errors: boolean;

  constructor(private studentService: StudentService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.listLevel = this.studentService.getListLevel();
    this.studentForm = this.formBuilder.group(
      {
        nom: new FormControl(null, Validators.required),
        sex: new FormControl(null, Validators.required),
        adresse: new FormControl(null, Validators.required),
        prenom: new FormControl(null, Validators.required),
        date_de_naissance: new FormControl(null, [Validators.required, this.studentService.dateValidator.bind(this)]),
        telephone: new FormControl(null, Validators.required),
        email: new FormControl(null),
        level: new FormControl(null),

      }
    );
  }

  updateStudent() {
    //  console.log(this.studentForm);
    if (this.studentForm.valid) {


      this.studentService.onUpdateStudent(
        new StudentModel(1, this.studentForm.controls.nom.value, this.studentForm.controls.prenom.value, new Date(this.studentForm.controls.date_de_naissance.value),
          this.studentForm.controls.adresse.value, this.studentForm.controls.telephone.value, this.studentForm.controls.email.value, this.studentForm.controls.sex.value, this.studentForm.controls.level.value,)
      );

      this.router.navigate(['student-list']);
    } else {
      this.errors = true;

    }

  }

}
