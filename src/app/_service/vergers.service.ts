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
    return this.httpClient.post(`${environment.urlApi}/Vergers`,JSON.stringify(Verger),this.httpOptions);
  }
  getPageVergers(pageSize:number,pageNumber:number){
    return this.httpClient.get(`${environment.urlApi}`+"/VergersPage?pageSize="+pageSize+"&pageNumber="+pageNumber);
  }

  DeleteVergers(id :number){
    return this.httpClient.delete(`${environment.urlApi}`+"/Vergers/"+id);
  }

  UpdateVergers(vergers: Vergers, id: number) {
    return this.httpClient.put(`${environment.urlApi}/Vergers/`+id,JSON.stringify(vergers),this.httpOptions);

  }
}
