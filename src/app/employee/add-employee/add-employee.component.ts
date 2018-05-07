import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {EmployeeModel} from "../employee-model";
import {Fonction} from "../fonction";
import {Router} from "@angular/router";
import {FormControl, FormGroup, NgForm} from "@angular/forms";

declare const $: any;

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  listFonction: Fonction[];

  constructor(private employeeService: EmployeeService, private router: Router) {
  }

  ngOnInit() {
    this.listFonction = this.employeeService.getListFunction();
  }

  addEmployee(employeeForm: NgForm) {
console.log(employeeForm);
    const matricule = this.employeeService.getListEmployee().length + 1;

    this.employeeService.onAddEmployee(
      new EmployeeModel(matricule, employeeForm.value.nom, employeeForm.value.prenom, new Date(employeeForm.value.date_de_naissance), new Date(employeeForm.value.date_emb),
        employeeForm.value.fonction, employeeForm.value.adresse, employeeForm.value.telephone, employeeForm.value.email, employeeForm.value.numCNSS,
        employeeForm.value.numCin, employeeForm.value.sex, employeeForm.value.situationFamiliale, employeeForm.value.nbEnfant, employeeForm.value.salaireDeBase)
    );
    // this.employeeService.onEmployeeAdded.next(this.employee);
    this.router.navigate(['employee-list']);
  }

}
