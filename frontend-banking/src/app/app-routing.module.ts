import { transition } from '@angular/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepositComponent } from './deposit/deposit.component';
import { PagenotfoundComponent } from './helper/pagenotfound/pagenotfound.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  { path: '', component: SignupComponent},
  { path: 'login', component: LoginPageComponent},

  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthenticationGuard] ,
  children:[
   // { path: '', redirectTo: "./dashboard", pathMatch: "full" },
    { path: '', component: ProfileComponent},
    { path: 'deposit', component: DepositComponent},
    { path: 'transaction', component: TransactionComponent}
  ]
},
{ path: '**', component: PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
