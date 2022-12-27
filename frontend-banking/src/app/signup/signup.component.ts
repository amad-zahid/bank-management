import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      accountNo: ['', Validators.required],
      balance: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.form.controls; }

  singupdata(){
    if(this.form.value.username =="" || this.form.value.firstName =="" || this.form.value.firstName ==""){
      alert('Please enter username, name and email');
    } else if(this.form.value.password ==""){
      alert('Please enter password');
    } else {
      let seconds = new Date().getTime() / 1000;
      console.log("this is signup account : "+seconds);
      this.form.value.accountNo = "1000-"+seconds;
      this.form.value.balance = 0;
      this.form.value.accountNo = this.form.value.accountNo.split('.')[0];

      console.log(this.form);

      this._http.post<any>("http://localhost:3000/users", this.form.value)
      .subscribe(res=>{
        alert('Account created successfully');
        this.form.reset();
        this.router.navigate(['login']);
      }, err=>{
        alert('Somthing went wrong');
      })
    }


  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
   // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    // this.loading = true;
    // this.accountService.register(this.form.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.alertService.success('Registration successful', { keepAfterRouteChange: true });
    //       this.router.navigate(['../login'], { relativeTo: this.route });
    //     },
    //     error => {
    //       this.alertService.error(error);
    //       this.loading = false;
    //     });
  }

}
