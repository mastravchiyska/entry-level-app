import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  user: User;
  users: User[];
  registerForm: FormGroup;

  constructor(public router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser') !== null) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    } else {
      this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    }
    this.users = JSON.parse(localStorage.getItem('users'));
  }

  onUpdate(userData: User): void {
    userData.email = this.user.email;
    const existsUser = this.users.find(usr => usr.nickname == userData.nickname && usr.email != userData.email);
    const indexOfUser = this.users.findIndex(usr => usr.email === userData.email);
    if (!existsUser && indexOfUser !== -1) {
      this.users[indexOfUser] = userData;
      localStorage.setItem('users', JSON.stringify(this.users));
      const storage = localStorage.getItem('currentUser')  ? localStorage : sessionStorage;
      storage.setItem('currentUser', JSON.stringify(userData));
      alert('User details successfully updated!');
    } else {
      alert('Username is alredy in use!');
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login'])
  }
}
