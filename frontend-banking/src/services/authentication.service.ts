import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  logOut(){
    console.log("logout...!!");
    localStorage.clear();
    this.router.navigate(['/login']);

  }
}
