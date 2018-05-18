import {Component, OnInit} from '@angular/core';
import {AdministrationService, Fonction} from "../administration.service";

@Component({
  selector: 'app-fonctions',
  templateUrl: './fonctions.component.html',
  styleUrls: ['./fonctions.component.css']
})
export class FonctionsComponent implements OnInit {

  constructor(private administrationService: AdministrationService) {
  }

  fonctions: Fonction[] = [];

  ngOnInit() {
    this.fonctions = this.administrationService.listFonction;
  }

}
