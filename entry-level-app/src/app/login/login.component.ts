import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  allUsers: User[] = [];

  constructor(public router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      nickname: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      isChecked: new FormControl(false)
    });
    this.allUsers = JSON.parse(localStorage.getItem('users'));
  }

  onLogin(loginData: FormGroup): void {
    const formData = loginData.value;
    const loggedUser = this.allUsers.find(user => {
      return user.nickname == formData.nickname && user.password == formData.password;
    });
    if (loggedUser) {
      if (formData.isChecked) {
        localStorage.setItem('currentUser', JSON.stringify(loggedUser));
      } else {
        sessionStorage.setItem('currentUser', JSON.stringify(loggedUser));
      }
      this.router.navigate(['/profile']);
    } else {
      alert("Wrong username or password!");
    }
  }
}
