import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Proprietaires} from '../_model/proprietaires';
import {environment} from '../../environments/environment';
import {Vergers} from '../_model/vergers';
import {DashboardHeadStatistic} from '../_model/DashboardHeadStatistic';
import {pieChart} from '../_model/pieChart';

@Injectable({
  providedIn: 'root'
})
export class PieChartService {
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type':'application/json', 'Access-Control-Allow-Credentials': 'true'})
  };
  constructor(private httpClient: HttpClient) { }

  getDataPieCharSexe(){
    return this.httpClient.get<pieChart[]>(`${environment.urlApi}`+"/PieCharSexe");
  }

}
