import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any
  model: any
  currentBalance: number = 0
  accountId : any = localStorage.getItem('userId');
  constructor(
    private router: Router,
    private userService: UsersService,
    private route: ActivatedRoute,
    private _http: HttpClient,
    private authenticateService: AuthenticationService,
  ) { }

  ngOnInit(): void {

    this.getUserDetail(Number(this.accountId));
    console.log("dashboarding calling");
    this.user = localStorage.getItem("user");
    console.log(this.user);
  }

  logOut() {
    this.authenticateService.logOut();
  }


  getUserDetail(accountid: number) {
    this.userService.getUserDetail(accountid).subscribe((res: any) => {
      console.log("user detail : "+JSON.stringify(res));

      this.currentBalance = res.balance;
      localStorage.setItem('user', JSON.stringify(res.data));
      localStorage.setItem('currentBalance', res.data.balance);
    }, (err: string) => {
     // alert('Something was wrong ');
    })
  }

}
