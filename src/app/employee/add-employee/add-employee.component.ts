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

  constructor(private employeeService: EmployeeService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.listFonction = this.employeeService.getListFunction();
    this.employeeForm = this.formBuilder.group(
      {
        'nom': new FormControl(null, Validators.required),
        'sex': new FormControl(null, Validators.required),
        'prenom': new FormControl(null, Validators.required),
        'date_de_naissance': new FormControl(null, [Validators.required, this.dateValidator.bind(this)]),
        'situationFamiliale': new FormControl(null, Validators.required),
        'nbEnfant': new FormControl(null, Validators.required),
        'adresse': new FormControl(null, Validators.required),
        'telephone': new FormControl(null, Validators.required),
        'email': new FormControl(null, Validators.required),
        'numCin': new FormControl(null, Validators.required),
        'numCNSS': new FormControl(null, Validators.required),
        'date_emb': new FormControl(null, [Validators.required, this.dateValidator.bind(this)]),
        'fonction': new FormControl(null, Validators.required),
        'salaireDeBase': new FormControl(null, [Validators.required, Validators.min(10)]),
      }
    );
  }

  dateValidator(date: FormControl) {
    const toDay = new Date();
    console.log(toDay);
    console.log(new Date(date.value));
    console.log(new Date(date.value) > toDay);
    if (      new Date(date.value) > toDay  ) {
      if(new Date(date.value).getFullYear()<1900){
        return {'dateNoOk': true};
      }
    }  return null;
  }

  addEmployee() {
    console.log(this.employeeForm);
    const matricule = this.employeeService.getListEmployee().length + 1;

    // this.employeeService.onAddEmployee(
    //   new EmployeeModel(matricule, employeeForm.value.nom, employeeForm.value.prenom, new Date(employeeForm.value.date_de_naissance), new Date(employeeForm.value.date_emb),
    //     employeeForm.value.fonction, employeeForm.value.adresse, employeeForm.value.telephone, employeeForm.value.email, employeeForm.value.numCNSS,
    //     employeeForm.value.numCin, employeeForm.value.sex, employeeForm.value.situationFamiliale, employeeForm.value.nbEnfant, employeeForm.value.salaireDeBase)
    // );
    // this.employeeService.onEmployeeAdded.next(this.employee);
    this.router.navigate(['employee-list']);
  }

}
