import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:any
  model: any
  currentBalance: number = 0
  constructor(
    private router: Router,
    private userService: UsersService,
    private route: ActivatedRoute,
    private _http: HttpClient
  ) { }

  ngOnInit(): void {
    console.log("dashboarding calling");
    this.user = localStorage.getItem("user");
    console.log(this.user);
    this.model = JSON.parse(this.user);
    console.log("balacnce : "+this.userService.getBalance(this.model.id));
    this.getBalance(this.model.id);
  }

  logOut(){
    localStorage.removeItem("user");
    this.router.navigate(['login']);
  }

  getBalance(accountid:number):number{
    console.log("logging calling");
    let balance = 0;

    // console.log(this.login.value);
     this._http.get<any>(`http://localhost:3000/users/${accountid}`)
     .subscribe(res=>{
      console.log("gettting balance :"+ res.balance);
      this.currentBalance = res.balance;
      localStorage.setItem('currentBalance',res.balance);

      // console.log(res);
      // let user = res;
      // user = JSON.parse(user);

       balance= res.balance;


     }, err=>{
       alert('Something was wrong');
     })
     return balance;
   }

}
