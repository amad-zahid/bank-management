import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any
  accountId : any = localStorage.getItem('userId');
  currentBalance: number = 0
  accountNo: string =  ""
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
    this.accountNo = this.user.accountNo;

  }

  getUserDetail(accountid: number) {
    this.userService.getUserDetail(accountid).subscribe((res: any) => {
      console.log("user detail : "+JSON.stringify(res));

      this.currentBalance = res.data.balance;
      this.user = res.data;
     // localStorage.setItem('user', JSON.stringify(res.data));
      localStorage.setItem('currentBalance', res.data.balance);
      this.accountNo = res.data.accountNo;
    }, (err: string) => {
     // alert('Something was wrong ');
    })
  }

}
