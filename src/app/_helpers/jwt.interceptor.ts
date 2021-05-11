import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../_service/authentication.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;

      if (currentUser && currentUser.token != null ) {

        request = request.clone({
          setHeaders: {
            Authorization: ` ${currentUser.token}`
          }
        });
        //document.cookie = "BEARER="+currentUser.token+ "; expires= Wed, 18 Sep 2019 09:03:52 GMT"
      } else {
        request = request.clone({
          setHeaders: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',

          }
        });
      }

       
        let handle_request = next.handle(request)
        //console.log(request)        
        return handle_request;
    }
}
