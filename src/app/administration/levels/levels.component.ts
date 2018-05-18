import { Component, OnInit } from '@angular/core';
import {AdministrationService, Level} from "../administration.service";

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css']
})
export class LevelsComponent implements OnInit {

  constructor(private administrationService: AdministrationService) {
  }

  levels: Level[] = [];

  ngOnInit() {
    this.levels = this.administrationService.listLevel;
  }

}
