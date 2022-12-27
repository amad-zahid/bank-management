import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  creditBalance = 0;
  debitBalance = localStorage.getItem('currentBalance');
  accounts: any;
  user: any

  model = {
    id : 0,
    from_id: 0,
    to_id: 0,
    amount: 0,
    type: "credit",
    date: new Date()
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private route: ActivatedRoute,
    private _http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    this.form = this.formBuilder.group({
      from_id: [this.user.username +" - "+this.user.accountNo, Validators.required],
      to_id: ['', Validators.required],
      amount: [0, Validators.required],
      remarks: ['', Validators.required],
      balance: ['', Validators.required],
    //  email: ['', Validators.required],
     // password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  loadUsers(){
    console.log("logging calling");

    // console.log(this.login.value);
     this._http.get<any>("http://localhost:3000/users")
     .subscribe(res=>{
       this.accounts = res;
       console.log(this.accounts);

     }, err=>{
       alert('Something was wrong');
     })
   }

   getToAccountBalance(accountid:number){
    console.log("logging calling");

    // console.log(this.login.value);
     this._http.get<any>(`http://localhost:3000/users/${accountid}`)
     .subscribe(res=>{
      console.log(res);

       this.creditBalance =  res.balance;
       console.log("tocccout balannace : "+this.creditBalance);

      // this.updateBalance(accountid,this.creditBalance);


     }, err=>{
       alert('Something was wrong');
     })
   }

   transaction(){
    if(this.form.value.amount > Number(this.debitBalance)){
      alert('Please enter proper amount to transfer');
    } else if(this.form.value.to_id == '0') {
      alert('please select To Account');
    }else {
      this.creditAmount();
      this.debitAmount();
     // this.updateBalance(this.user.id,this.form.value.amount);
        alert('Transaction successfully');
       // this.form.reset();
        this.router.navigate(['dashboard']);
    }

   }

  creditAmount(){
   let modelTest = {
      from_id: this.user.id,
      to_id: this.form.value.to_id,
      accountid: Number(this.form.value.to_id),
      amount: this.form.value.amount,
      type: "credit",
      date: new Date()
    }

   //  await this.getToAccountBalance(modelTest.accountid);

    console.log("balaanananannan : "+this.creditBalance);
    this.creditBalance =this.creditBalance + modelTest.amount;
    this.updateBalance(modelTest.accountid,this.creditBalance);

    this._http.post<any>("http://localhost:3000/transaction", modelTest)
    .subscribe(res=>{
      console.log("data credit");

      // alert('data added successfully');
      // this.form.reset();
      // this.router.navigate(['login']);
    }, err=>{
      alert('Somthing went wrong');
    })
  }

  debitAmount(){
    let modelTest = {
       from_id: this.user.id,
       to_id: this.form.value.to_id,
       accountid: this.user.id,
       amount: this.form.value.amount,
       type: "debit",
       date: new Date()
     }

     let balance = Number(this.debitBalance) - modelTest.amount;
       this.updateBalance(this.user.id,balance);

     this._http.post<any>("http://localhost:3000/transaction", modelTest)
     .subscribe(res=>{
       console.log("data debit");


       // alert('data added successfully');
       // this.form.reset();
       // this.router.navigate(['login']);
     }, err=>{
       alert('Somthing went wrong');
     })
   }

   updateBalance(accountid:number,balance:number){
    let model = {
      id : accountid,
      balance: balance
    }
    this._http.patch<any>(`http://localhost:3000/users/${accountid}/`, model)
    .subscribe(res=>{
    //  alert('data added successfully');
      // this.form.reset();
      // this.router.navigate(['login']);
    }, err=>{
      alert('Somthing went wrong');
    })

  }

  onAccountChange(vale:any){
    console.log("account changeing " + JSON.stringify(vale));
    if(Number(vale)>0)
    {
      this.getToAccountBalance(Number(vale));
    }



  }
  logOut(){
    localStorage.removeItem("user");
    this.router.navigate(['login']);
  }

}
