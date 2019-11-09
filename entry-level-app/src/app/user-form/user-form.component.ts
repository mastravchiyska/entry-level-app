import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() userData: User;
  @Input() isEmailDisabled: boolean;
  @Input() buttonName: string;
  @Output() onSubmit = new EventEmitter<User>();
  countries: string[] = ['Austria', 'Bulgaria', 'Germany', 'Spain', 'Turkey', 'UK', 'USA'];
  form: FormGroup;

  constructor(public router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'nickname': new FormControl(this.userData.nickname, [Validators.required, Validators.minLength(4), Validators.maxLength(40)]),
      'phone': new FormControl(this.userData.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(15)]),
      'country': new FormControl(this.userData.country, Validators.required),
      'email': new FormControl({ value: this.userData.email, disabled: false }, [Validators.required, Validators.email, Validators.maxLength(40)]),
      'password': new FormControl(this.userData.password, [Validators.required, Validators.minLength(4), Validators.maxLength(40)]),
      'confirm': new FormControl(this.userData.password, Validators.required),
    });
    if (this.isEmailDisabled) {
      this.form.controls['email'].disable()
    }
  }

  onSend(user: FormGroup): void {
    if (!user.invalid) {
      this.onSubmit.emit(user.value);
    } else {
      alert("Fields are not valid!");
    }
  }

}
