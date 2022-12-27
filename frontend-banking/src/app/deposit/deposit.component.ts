import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { UsersService } from 'src/services/users.service';
import { SweetalertService } from 'src/services/sweetalert.service';
import { TransactionService } from 'src/services/transaction.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  wrongSubmission: boolean = false;
  isAmount : boolean =  false;
  isLoaded = false;
  submitted = false;
  creditBalance = 0;
  userid = localStorage.getItem("userId");
  debitBalance = localStorage.getItem('currentBalance');
  accounts: any;
  user: any

   now = Date.now();
   myFormattedDate = this.pipe.transform(this.now, 'yyyy-MM-dd');


  model = {
    id : 0,
    users_id: 0,
    transfer_to: 0,
    amount: 0,
    remarks: "",
     type: "credited",
     transaction_date: this.myFormattedDate
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private route: ActivatedRoute,
    private _http: HttpClient,
    private alert: SweetalertService,
    private transctionService : TransactionService,
    private pipe : DatePipe
  ) { }

  ngOnInit(): void {

  //  let date =  Date.now().toString();
    let date = new Date();
    const now = Date.now();
    const myFormattedDate = this.pipe.transform(now, 'yyyy-MM-dd');
    console.log("date : "+myFormattedDate);

    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    this.form = this.formBuilder.group({
      users_id: [{value: this.user.name +" - "+this.user.accountNo, disabled: true}, Validators.required],
      transfer_to: [0, Validators.required],
      amount: [0, Validators.required],
      remarks: ['', Validators.required],
      // balance: ['', Validators.required],
    });
    this.debitBalance = localStorage.getItem('currentBalance');
     this.getBalanceFromUser(Number(this.userid));
    this.loadUsers();
  //  this.isLoaded = true;
  }

  getBalanceFromUser(accountid: number) {
    this.userService.getBalance(accountid).subscribe((res: any) => {
      this.debitBalance = res.data.balance;
      localStorage.setItem('currentBalance', res.data.balance);
    }, (err: string) => {
     // alert('Something was wrong ');
    })
  }

  loadUsers(){
    console.log("all accounts");
     this.userService.getAllAccounts()
     .subscribe(res=>{
       this.accounts = res.data;
       console.log(this.accounts);
       this.isLoaded = true;
     }, err=>{
       this.alert.error('Error','Something was wrong');
     })
   }

   getBalance(accountid: number) {
    this.userService.getBalance(accountid).subscribe((res: any) => {
     // this.currentBalance = res.balance;
      this.debitBalance = localStorage.getItem('currentBalance');
    }, (err: string) => {
     // alert('Something was wrong ');
    })
  }

   transaction(){
    console.log(this.form.value);
    this.model.users_id = this.user.id;
    this.model.transfer_to = this.user.id;
    this.model.amount = this.form.value.amount;
    this.model.remarks = this.form.value.remarks;
    this.model.type = 'deposit';
    console.log("model : "+JSON.stringify(this.model));
    if( this.form.value.amount == 0){
        this.wrongSubmission = true;
    } else {
      this.transctionService.transfer(this.model)
      .subscribe(res => {
        console.log("res : "+JSON.stringify(res));
        if (res.success == true) {
          this.alert.success("Success","Successfully Deposited.")
          this.form.reset();
          this.router.navigate(['../dashboard']);
        }
      }, err => {
        this.alert.error("error", "some thing went wrong")
      })
    }
   }


  onAccountChange(vale:any){
    if(Number(vale)>0)
    {
      this.user
      this.getBalance(Number(vale));
    }
  }

  logOut(){
    localStorage.removeItem("user");
    this.router.navigate(['login']);
  }


}
