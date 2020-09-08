import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { DashboardService } from '../_services/dashboard.service';


export interface Employee {
  _id: String;
  name: String;
  email: String;
  salary: Number;
  date: Date;
}

export const TABLE_DATA: Employee[] = [
  {
    _id: '7527318727v8312v8638',
    name: 'Bruce Wayne',
    email: 'bruce@waynecorp.com',
    salary: 120000,
    date: null,
  },
  {
    _id: '752731872123d312v8638',
    name: 'Bruce Wayne 1',
    email: 'bruce1@waynecorp.com',
    salary: 150000,
    date: null,
  },
  {
    _id: '75273187hjg5312v8638',
    name: 'Bruce Wayne 2',
    email: 'bruce2@waynecorp.com',
    salary: 100000,
    date: null,
  }
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private dashboardService: DashboardService
  ) { }

  displayedColumns: string[] = ['name', 'email', 'salary', 'date', 'action'];
  dataSource: Employee[];
  model: Employee;

  addNewEmpCheck: boolean = false;

  ngOnInit(): void {
    this.dashboardService.getEmployeeData()
      .subscribe( (obj) => {
        if(obj.ok) {
          this.dataSource = obj.data.employees;
        }
        else {
          console.log('no employee records found!');
        }
      });
  }

  editEmpDialog(empDiagRef: TemplateRef<any>, element) {
    this.addNewEmpCheck = false;
    this.model = element;
    this.dialog.open(empDiagRef);
  }

  addEmpDialog(empDiagRef: TemplateRef<any>) {
    this.addNewEmpCheck = true;
    this.model = {
      _id: null,
      name: null,
      email: null,
      salary: null,
      date: null
    }
    this.dialog.open(empDiagRef);
  }

  onSubmit(value) {
    if (this.addNewEmpCheck) {
      this.dataSource.push(value);
    }
    else {
      let index = _.findIndex(this.dataSource, ['_id', value._id]);
      if (index>-1) {
        this.dataSource[index] = value;
      }
    }
    this.table.renderRows();
    this.dialog.closeAll();

    this.dashboardService.addOrUpdateEmployee(value)
      .subscribe( (obj) => {
        if(obj.ok) console.log('employee record added/recorded successfully');
        else console.error(obj.data);
      });
  }

  delete(id) {
    this.dataSource = this.dataSource.filter( (obj: Employee) => {
      return obj._id !== id
    });
    let payload = {
      id: id
    }
    this.dashboardService.removeEmployee(payload)
      .subscribe( (obj) => {
        if(obj.ok) console.log('employee record deleted successfully');
        else console.error(obj.data);
      });
  }

  logout() {
    this.router.navigateByUrl('/');
    localStorage.clear();
  }

}
