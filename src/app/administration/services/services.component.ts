import { Component, OnInit } from '@angular/core';
import {AdministrationService, Service} from "../administration.service";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(private administrationService: AdministrationService) {
  }

  services: Service[] = [];

  ngOnInit() {
    this.services = this.administrationService.listService;
  }

}
