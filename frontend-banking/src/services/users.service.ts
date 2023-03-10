import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = environment.baseURL;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _http: HttpClient
  ) { }


  getUserDetail(id: number) {
    console.log("getting user detail");

    return this._http.get<any>(`${this.baseUrl}/users/${id}`)
  }

  getAllAccounts() {
    return this._http.get<any>(`${environment.baseURL}/users`);
  }

  getBalance(id: number) {
    return this._http.get<any>(`${this.baseUrl}/users/${id}`)
  }

}
