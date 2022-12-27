import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  myDate = new Date();
  login!: FormGroup;
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
    localStorage.removeItem('user');
    this.login = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      accountNo: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  logindata(){
    console.log("logging calling");

    // console.log(this.login.value);
     this._http.get<any>("http://localhost:3000/users")
     .subscribe(res=>{
       const user = res.find((a:any)=>{
         return a.username === this.login.value.username && a.password === this.login.value.password
       });

       if(user){
        localStorage.setItem("user", JSON.stringify(user));
       //  alert('you are successfully login');
         this.login.reset();
       //  $('.form-box').css('display','none');
         this.router.navigate(['dashboard']);
       }else{
         alert('User Not Found');
         this.router.navigate(['login']);
       }

     }, err=>{
       alert('Something was wrong');
     })
   }

  onSubmit(){

  }

}
