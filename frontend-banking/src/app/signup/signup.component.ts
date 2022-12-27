import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { SweetalertService } from 'src/services/sweetalert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  wrongSubmission: boolean = false;
  loading = false;
  submitted = false;
  baseUrl = environment.baseURL;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _http: HttpClient,
    private alert: SweetalertService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
    //  username: ['', Validators.required],
      accountNo: ['', Validators.required],
    // balance: [0, Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.form.controls; }

  register() {
    if (this.form.valid) {
      this.wrongSubmission = true;
    } else {
      let seconds = new Date().getTime() / 1000;
      this.form.value.accountNo = "1000-" + seconds;
     // this.form.value.balance = 0;
      this.form.value.accountNo = this.form.value.accountNo.split('.')[0];
      this.form.value.branch = "lahore"
      this._http.post<any>(`${this.baseUrl}/register`, this.form.value)
        .subscribe(res => {
          console.log("res : "+JSON.stringify(res));
          if (res.success == true) {
            this.alert.success("success", res.message)
            this.form.reset();
            this.router.navigate(['login']);
          }
        }, err => {
          this.alert.error("error", "some thing went wrong")

        })
    }


  }

}
