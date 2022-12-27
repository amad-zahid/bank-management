import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _http: HttpClient
  ) { }

 async getBalance(accountid:number):Promise<number>{
    console.log("logging calling");
    let balance = 0;

    // console.log(this.login.value);
   await  this._http.get<any>(`http://localhost:3000/users/${accountid}`)
     .subscribe(res=>{
      console.log("gettting balance :"+ res.balance);

      // console.log(res);
      // let user = res;
      // user = JSON.parse(user);

      balance = res.balance;


     }, err=>{
      return 0;
       alert('Something was wrong');
     })
    return balance;
   }

  logindata(userid:any){
    console.log("logging calling");

    // // console.log(this.login.value);
    //  this._http.get<any>("http://localhost:3000/balance")
    //  .subscribe(res=>{
    //    const user = res.find((a:any)=>{
    //      return a.username === this.login.value.username && a.password === this.login.value.password
    //    });

    //    if(user){
    //     localStorage.setItem("user", JSON.stringify(user));
    //      alert('you are successfully login');
    //      this.login.reset();
    //    //  $('.form-box').css('display','none');
    //      this.router.navigate(['dashboard']);
    //    }else{
    //      alert('User Not Found');
    //      this.router.navigate(['login']);
    //    }

    //  }, err=>{
    //    alert('Something was wrong');
    //  })
   }


}
