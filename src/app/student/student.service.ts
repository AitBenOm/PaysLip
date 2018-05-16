import { Injectable } from '@angular/core';
import {Level} from "./level";
import {StudentModel} from "./student.model";
import {FormControl} from "@angular/forms";

@Injectable()
export class StudentService {

  constructor() { }
  private _listFunction: Level[] = [
    new Level(1, 'Directeur'),
    new Level(2, 'Enseignant'),
    new Level(3, 'Secretaire'),
    new Level(4, 'Surveillant Générale'),
    new Level(5, 'Accompagnateur'),
  ];
  private _listStudent: StudentModel[] = [
    new StudentModel(1, "Ait benaissa", "Omar", new Date('1991-04-12'), '5 Rue Maurice Couderchet', ['0664941132'], 'omar.benaissa@outlook.com', 'M', 'CM'),
    new StudentModel(1, "Ait benaissa", "Omar", new Date('1991-04-12'), '5 Rue Maurice Couderchet', ['0664941132'], 'omar.benaissa@outlook.com', 'M', 'CM'),
    new StudentModel(1, "Ait benaissa", "Omar", new Date('1991-04-12'), '5 Rue Maurice Couderchet', ['0664941132'], 'omar.benaissa@outlook.com', 'M', 'CM'),
    new StudentModel(1, "Ait benaissa", "Omar", new Date('1991-04-12'), '5 Rue Maurice Couderchet', ['0664941132'], 'omar.benaissa@outlook.com', 'M', 'CM'),
    new StudentModel(1, "Ait benaissa", "Omar", new Date('1991-04-12'), '5 Rue Maurice Couderchet', ['0664941132'], 'omar.benaissa@outlook.com', 'M', 'CM'),
    new StudentModel(1, "Ait benaissa", "Omar", new Date('1991-04-12'), '5 Rue Maurice Couderchet', ['0664941132'], 'omar.benaissa@outlook.com', 'M', 'CM'),
    new StudentModel(1, "Ait benaissa", "Omar", new Date('1991-04-12'), '5 Rue Maurice Couderchet', ['0664941132'], 'omar.benaissa@outlook.com', 'M', 'CM'),
    new StudentModel(1, "Ait benaissa", "Omar", new Date('1991-04-12'), '5 Rue Maurice Couderchet', ['0664941132'], 'omar.benaissa@outlook.com', 'M', 'CM'),
    new StudentModel(1, "Ait benaissa", "Omar", new Date('1991-04-12'), '5 Rue Maurice Couderchet', ['0664941132'], 'omar.benaissa@outlook.com', 'M', 'CM'),
    new StudentModel(1, "Ait benaissa", "Omar", new Date('1991-04-12'), '5 Rue Maurice Couderchet', ['0664941132'], 'omar.benaissa@outlook.com', 'M', 'CM'),

  ];

  getListStudent(): StudentModel[] {
    return this._listStudent;
  }


  getListFunction(): Level[] {
    return this._listFunction;
  }

  setListStudent(value: StudentModel[]) {
    this._listStudent = value;
  }

  checkStudentByMumEtudiant(numEtudiant) {
    return (student) => {
      return student.numEtudiant.toString() === numEtudiant;
    };
  }

  getStudentbyMumEtudiant(index: string) {

    const student = this.getListStudent().find(this.checkStudentByMumEtudiant(index));
// console.log(student);
    return student;
  }

  onUpdateStudent(student: StudentModel) {
    const index = this.getListStudent().indexOf(this.getListStudent().find(this.checkStudentByMumEtudiant(student.numEtudiant)));
    console.log(index);
    this.getListStudent().splice(index, 1);
    this.getListStudent().push(student);
  }

  onAddStudent(student: StudentModel) {
    this._listStudent.push(student);
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

}
