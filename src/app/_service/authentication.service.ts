import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
 import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {User} from '../_model/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin':'https://51.77.195.187:8089/*'
  })
};

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  stringifiedData: any;
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }



  logout() {
    // remove user from local storage to log user out
    this.currentUserSubject.next(null);

    localStorage.clear();
    window.location.reload();

  }


  public userAuthentication(email,password): Observable<HttpResponse<Object>>  {

    var myData = {
      email: email,
      password:  password,

    };
    this.stringifiedData = JSON.stringify(myData);
     return this.http.post(`${environment.urlApi}/login`, this.stringifiedData,{observe: 'response'})


  }

  public getUserByEmail(email: String): Observable<any> {

    return this.http.get(`${environment.urlApi}/getUserByEmail/`+email);




  }
}
