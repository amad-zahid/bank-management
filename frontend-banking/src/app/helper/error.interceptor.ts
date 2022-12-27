import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("error catching in interceptor" );

      return next.handle(request).pipe(catchError(err => {
        console.log("catch error"+JSON.stringify(err.status));
          if ([401, 403].includes(err.status)) {
              // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
              this.authenticationService.logOut();
          }

          const error = err.error.message || err.statusText;
          return throwError(error);
      }))
  }
}
