import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../_helpers/must-match.validator';
import {User} from '../_model/user';
import {UserService} from '../_service/user.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  FormGroup: FormGroup;
  User: User;

  constructor(private fb: FormBuilder, private  UserService: UserService,private route:Router) {
  }

  ngOnInit() {

    this.FormGroup = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.min(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required],

    }, {
      validator: MustMatch('password', 'ConfirmPassword')

    });

  }

  get f() {
    return this.FormGroup.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.FormGroup.invalid) {

      return;
    }
    this.User = this.FormGroup.value;
    this.UserService.RegisterUser(this.User).subscribe(value => {
      this.submitted = false;
   // this.route.navigate(['/login'])
  } );

  }
}
