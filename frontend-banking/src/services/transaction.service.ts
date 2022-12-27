import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseUrl = environment.baseURL;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _http: HttpClient
  ) { }

  transfer(model:any){
    return this._http.post<any>(`${this.baseUrl}/transactions`,model)
   }

}
