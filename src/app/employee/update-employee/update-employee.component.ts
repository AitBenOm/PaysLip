import {Component, Input, OnInit} from '@angular/core';
import {EmployeeModel} from "../employee-model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Fonction} from "../fonction";
import {EmployeeService} from "../employee.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  @Input() employee: EmployeeModel = null;
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
        date_de_naissance: new FormControl(null, [Validators.required, this.employeeService.dateValidator.bind(this)]),
        situationFamiliale: new FormControl(null, Validators.required),
        nbEnfant: new FormControl(null, Validators.required),
        adresse: new FormControl(null, Validators.required),
        telephone: new FormControl(null, Validators.required),
        email: new FormControl(null),
        numCin: new FormControl(null, Validators.required),
        numCNSS: new FormControl(null, Validators.required),
        date_emb: new FormControl(null, [Validators.required, this.employeeService.dateValidator.bind(this)]),
        fonction: new FormControl(null),
        salaireDeBase: new FormControl(null, [Validators.required, Validators.min(10)]),
      }
    );
  }

  updateEmployee() {
    //  console.log(this.employeeForm);
    if (this.employeeForm.valid) {


      this.employeeService.onUpdateEmployee(
        new EmployeeModel(this.employee.matricule, this.employeeForm.controls.nom.value, this.employeeForm.controls.prenom.value, new Date(this.employeeForm.controls.date_de_naissance.value), new Date(this.employeeForm.controls.date_emb.value),
          this.employeeForm.controls.fonction.value, this.employeeForm.controls.adresse.value, this.employeeForm.controls.telephone.value, this.employeeForm.controls.email.value, this.employeeForm.controls.numCNSS.value,
          this.employeeForm.controls.numCin.value, this.employeeForm.controls.sex.value, this.employeeForm.controls.situationFamiliale.value, this.employeeForm.controls.nbEnfant.value, this.employeeForm.controls.salaireDeBase.value)
      );

      this.router.navigate(['employee-list']);
    } else {
      this.errors = true;

    }


}

//employee = new EmployeeModel(1,"ait benaissa","omar",new Date('13/04/199'),new Date('13/04/199'),'Directeur','5 Rue Maurice Couderchet','0664941132','omar.benaissa@outlook.com','123456','ic60793','H','M',2);

}
