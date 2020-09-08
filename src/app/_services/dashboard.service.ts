import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(
        private http: HttpClient
    ) {}

    empUrl: string = environment.domain + 'employee';
    delEmpUrl: string = environment.domain + 'employee/delete-emp';

    headers = new HttpHeaders({
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem('token')
    })

    public getEmployeeData(): Observable<any> {
        return this.http.get(this.empUrl, {
            headers: this.headers
        })
    }

    public addOrUpdateEmployee(payload): Observable<any> {
        return this.http.post(this.empUrl, payload,{
            headers: this.headers
        })
    }

    public removeEmployee(payload): Observable<any> {
        return this.http.post(this.delEmpUrl, payload,{
            headers: this.headers
        }) 
    }

}