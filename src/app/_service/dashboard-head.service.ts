import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Proprietaires} from '../_model/proprietaires';
import {environment} from '../../environments/environment';
import {Vergers} from '../_model/vergers';
import {DashboardHeadStatistic} from '../_model/DashboardHeadStatistic';

@Injectable({
  providedIn: 'root'
})
export class DashboardHeadService {
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type':'application/json', 'Access-Control-Allow-Credentials': 'true'})
  };
  constructor(private httpClient: HttpClient) { }

  getDashboardHead(){
    return this.httpClient.get<DashboardHeadStatistic>(`${environment.urlApi}`+"/DashboardHeadStatistic");
  }

}
