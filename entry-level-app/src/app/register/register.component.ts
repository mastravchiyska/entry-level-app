import { Component, OnInit, Input } from '@angular/core';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  users: User[] = [];
  formDefoultValues: User = { nickname: null, password: null, phone: null, email: null, country: null };
  currentUser: User;

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('users')) {
      this.users = JSON.parse(localStorage.getItem('users'));
    }
  }

  onRegister(user: FormGroup) {
    if (user.value.passsword !== user.value.confirm) {
      alert('Password do not match!')
      return;
    } else {
      delete user.value.confirm;
    }

    const existsUser = this.users.some(usr => user.value.nickname === usr.nickname || user.value.email === usr.email);
    if (!existsUser) {
      this.users.push(user.value);
      localStorage.setItem('users', JSON.stringify(this.users));
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/profile']);
      alert('Successful registration!');
    } else {
      alert('Username or email is already regestered!');
    }
  }
}
