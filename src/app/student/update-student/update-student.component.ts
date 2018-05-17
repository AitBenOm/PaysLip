import {Component, Input, OnInit} from '@angular/core';
import {StudentModel} from "../student.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StudentService} from "../student.service";
import {Router} from "@angular/router";
import {Level} from "../level";

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

  @Input() student: StudentModel = null;
  listLevel: Level[];
  studentForm: FormGroup;
  errors: boolean;

  constructor(private studentService: StudentService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.listLevel = this.studentService.getListLevel();
    this.studentForm = this.formBuilder.group(
      {
        nom: new FormControl(this.student.nom, Validators.required),
        sex: new FormControl(this.student.sex, Validators.required),
        adresse: new FormControl(this.student.adresse, Validators.required),
        prenom: new FormControl(this.student.prenom, Validators.required),
        date_de_naissance: new FormControl(this.student.date_de_naissance, [Validators.required, this.studentService.dateValidator.bind(this)]),
        telephone: new FormControl(this.student.contacts, Validators.required),
        email: new FormControl(this.student.email),
        level: new FormControl(this.student.level),

      }
    );
  }

  updateStudent() {
    //  console.log(this.studentForm);
    if (this.studentForm.valid) {


      this.studentService.onUpdateStudent(
        new StudentModel(this.student.numEtudiant, this.studentForm.controls.nom.value, this.studentForm.controls.prenom.value, new Date(this.studentForm.controls.date_de_naissance.value),
          this.studentForm.controls.adresse.value, this.studentForm.controls.telephone.value, this.studentForm.controls.email.value, this.studentForm.controls.sex.value, this.studentForm.controls.level.value,)
      );

      this.router.navigate(['student-list']);
    } else {
      this.errors = true;

    }

  }
}
