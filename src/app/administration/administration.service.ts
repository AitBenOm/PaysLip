import { Injectable } from '@angular/core';

export interface Service {
  service_Id: number;
  description: string;
  }
export interface Fonction {
  fonction_Id: number;
  description: string;
  }
export interface Level {
  level_Id: number;
  description: string;
  }

@Injectable()

export class AdministrationService {

  constructor() { }
  listLevel: Level[] = [
    {level_Id: 1,
      description:'CM'},
    {level_Id: 2,
      description:'CM'},
    {level_Id: 3,
      description:'CM'},
    {level_Id: 4,
      description:'CM'},
    {level_Id: 5,
      description:'CM'},
    {level_Id: 6,
      description:'CM'},
    {level_Id: 7,
      description:'CM'},
    ];
  listService: Service[] = [
    {service_Id: 1,
      description:'Aministration'},
    {service_Id: 2,
      description:'Sercretaria'},
    {service_Id: 3,
      description:'Transport'},
    {service_Id: 4,
      description:'Menage'},
    {service_Id: 5,
      description:'Gardien / Jardinage'}

    ];
  listFonction: Fonction[] = [
    {fonction_Id: 1,
      description:'Enseignant'},
    {fonction_Id: 2,
      description:'Directeur'},
    {fonction_Id: 3,
      description:'Chauffeur'},
    {fonction_Id: 4,
      description:'Accompagnateur'},
    {fonction_Id: 5,
      description:'Surveillant'},
    {fonction_Id: 6,
      description:'Secretaire'},

    ];

}
