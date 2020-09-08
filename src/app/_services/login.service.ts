import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(
        private http: HttpClient
    ) {}

    loginUrl: string = environment.domain + 'login';
    headers = new HttpHeaders({
        "Content-Type": "application/json"
    })

    public login(payload): Observable<any> {
        return this.http.post(this.loginUrl, payload, {
            headers: this.headers
        })
    }

}