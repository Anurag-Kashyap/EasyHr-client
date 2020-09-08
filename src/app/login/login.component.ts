import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../_services/login.service';

export interface User {
  user: string;
  pass: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }


  user: User;
  credentialsChecker: boolean = false;

  onSubmit(val) {
    // console.log(val)
    let payload = {
      username: val.user,
      password: val.pass
    };
    this.loginService.login(payload)
      .subscribe( (obj) => {
        if(obj.ok) {
          console.log('logged in');
          localStorage.setItem('token', obj.data.token);
          this.router.navigateByUrl('/dashboard');
        }
        else {
          console.log('invalid credentials');
          this.credentialsChecker = true;
        }
      });

  }

  ngOnInit(): void {
    this.user = {
      user: null,
      pass: null
    }
  }

}
