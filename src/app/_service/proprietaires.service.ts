import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Proprietaires} from '../_model/proprietaires';
import {Injectable} from '@angular/core';
@Injectable()
export class ProprietairesService {

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type':'application/json', 'Access-Control-Allow-Credentials': 'true'})
  };
  constructor(private httpClient: HttpClient) { }

  addproprietaires(Proprietaires:Proprietaires){
     return this.httpClient.post(`${environment.urlApi}/Proprietaires`,JSON.stringify(Proprietaires),this.httpOptions);
  }
  getPageProprietaires(pageSize:number,pageNumber:number){
     return this.httpClient.get(`${environment.urlApi}`+"/ProprietairesPage?pageSize="+pageSize+"&pageNumber="+pageNumber);
  }
}
