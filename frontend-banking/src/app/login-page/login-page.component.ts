import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from 'src/services/registration.service';
import { SweetalertService } from 'src/services/sweetalert.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  wrongSubmission: boolean = false;
  myDate = new Date();
  login!: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _http: HttpClient,
    private register: RegistrationService,
    private alert: SweetalertService
  ) {
  }

  ngOnInit(): void {
    localStorage.removeItem('user');
    this.login = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (!this.login.valid) {
        this.wrongSubmission = true;
    } else {
      this.wrongSubmission = false;
      let model = {
        email: this.login.value.email,
        password: this.login.value.password
      }
      this.register.login(model)
        .subscribe((res: any) => {
          if (res.success == true) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.id);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("isLoggedIn", 'true');

            console.log("res on login : " + JSON.stringify(res));
            this.login.reset();
            this.router.navigate(['dashboard']);
          } else {
            this.alert.success("Oops", res.message);

          }

        }, err => {
          this.alert.error("error", "some thing went wrong");
        })
    }

  }

}
