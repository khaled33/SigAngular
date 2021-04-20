import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Proprietaires} from '../_model/proprietaires';
import {environment} from '../../environments/environment';
import {Vergers} from '../_model/vergers';

@Injectable({
  providedIn: 'root'
})
export class VergersService {
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type':'application/json', 'Access-Control-Allow-Credentials': 'true'})
  };
  constructor(private httpClient: HttpClient) { }
  addVergers(Verger:Vergers){
    return this.httpClient.post(`${environment.urlApi}/vergers`,JSON.stringify(Verger),this.httpOptions);
  }
  getPageProprietaires(pageSize:number,pageNumber:number){
    return this.httpClient.get(`${environment.urlApi}`+"/ProprietairesPage?pageSize="+pageSize+"&pageNumber="+pageNumber);
  }
}
