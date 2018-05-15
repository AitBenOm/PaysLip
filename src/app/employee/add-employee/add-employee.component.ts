import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {EmployeeModel} from "../employee-model";
import {Fonction} from "../fonction";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {getLocaleDateFormat} from "@angular/common";

declare const $: any;

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  listFonction: Fonction[];
  employeeForm: FormGroup;
  errors: boolean;

  constructor(private employeeService: EmployeeService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.listFonction = this.employeeService.getListFunction();
    this.employeeForm = this.formBuilder.group(
      {
        nom: new FormControl(null, Validators.required),
        sex: new FormControl(null, Validators.required),
        prenom: new FormControl(null, Validators.required),
        date_de_naissance: new FormControl(null, [Validators.required, this.dateValidator.bind(this)]),
        situationFamiliale: new FormControl(null, Validators.required),
        nbEnfant: new FormControl(null, Validators.required),
        adresse: new FormControl(null, Validators.required),
        telephone: new FormControl(null, Validators.required),
        email: new FormControl(null),
        numCin: new FormControl(null, Validators.required),
        numCNSS: new FormControl(null, Validators.required),
        date_emb: new FormControl(null, [Validators.required, this.dateValidator.bind(this)]),
        fonction: new FormControl(null),
        salaireDeBase: new FormControl(null, [Validators.required, Validators.min(10)]),
      }
    );
    console.log(this.employeeForm.controls.nom);
  }

  dateValidator(date: FormControl) {
    const toDay = new Date();
    console.log(toDay);
    console.log(new Date(date.value));
    console.log(new Date(date.value).getTime() > toDay.getTime());
    if (new Date(date.value).getTime() > toDay.getTime() || new Date(date.value).getFullYear() < 1900) {

      return {'dateNoOk': true};
    }
    return null;
  }

  addEmployee() {
    //  console.log(this.employeeForm);
    if( this.employeeForm.valid){
      const matricule = this.employeeService.getListEmployee().length + 1;

      this.employeeService.onAddEmployee(
        new EmployeeModel(matricule, this.employeeForm.controls.nom.value, this.employeeForm.controls.prenom.value, new Date(this.employeeForm.controls.date_de_naissance.value), new Date(this.employeeForm.controls.date_emb.value),
          this.employeeForm.controls.fonction.value, this.employeeForm.controls.adresse.value, this.employeeForm.controls.telephone.value, this.employeeForm.controls.email.value, this.employeeForm.controls.numCNSS.value,
          this.employeeForm.controls.numCin.value, this.employeeForm.controls.sex.value, this.employeeForm.controls.situationFamiliale.value, this.employeeForm.controls.nbEnfant.value, this.employeeForm.controls.salaireDeBase.value)
      );
      //this.employeeService.onEmployeeAdded.next(this.employee);
      this.router.navigate(['employee-list']);
    }else{
      this.errors=true;
      for (const field in this.employeeForm.controls) { // 'field' is a string
        if(this.employeeForm.get(field).invalid ){
         console.log(this.employeeForm.get(field));
       // (this.employeeForm.get(field)).touched=true;
        }
      }
    }

  }

}
