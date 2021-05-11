import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../_service/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../_model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error: string=null;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/dashboard']);


    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  registre() {
    this.router.navigate(['/register']);
  }

  SendMailForgotPassword() {
    this.router.navigate(['/SendMailForgotPassword']);
  }

  onSumbit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.authenticationService.userAuthentication(email, password)
      .subscribe((data: any) => {
          let token = data.headers.get('Authorization');
          let user: User = null;
          this.authenticationService.getUserByEmail(email).subscribe(async value => {
            user = value;
            user.token = token;
            this.error=null;
            this.submitted=false;

            localStorage.setItem('currentUser', JSON.stringify(user));

            this.router.navigate(['/dashboard']);
            window.location.reload();


          });
        }, error1 => {
          this.error = 'Email ou Mot de passe incorrecte';

        },
        () => {


        });
  }
}
