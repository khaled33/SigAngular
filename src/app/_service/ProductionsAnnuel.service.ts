import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Proprietaires} from '../_model/proprietaires';
import {environment} from '../../environments/environment';
import {AnneeProduction} from '../_model/productions-annuel';
import {pieChart} from '../_model/pieChart';
 
@Injectable({
  providedIn: 'root'
})
export class ProductionsAnnuelService {
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type':'application/json', 'Access-Control-Allow-Credentials': 'true'})
  };
  constructor(private httpClient: HttpClient) { }
  addProductionsAnnuel(ProductionsAnnuel:AnneeProduction){
    return this.httpClient.post(`${environment.urlApi}/ProductionsAnnuel`,JSON.stringify(ProductionsAnnuel),this.httpOptions);
  }
  getPageProductionsAnnuelPage(pageSize:number,pageNumber:number){
    return this.httpClient.get(`${environment.urlApi}`+"/ProductionsAnnuelPage?pageSize="+pageSize+"&pageNumber="+pageNumber);
  }
  getPageProductionsAnnuel(){
    return this.httpClient.get<AnneeProduction[]>(`${environment.urlApi}`+"/ProductionsAnnuel");
  }
  getBarChartProductionAnnuel(){
    return this.httpClient.get<pieChart[]>(`${environment.urlApi}`+"/BarChartProductionAnnuel");
  }

  DeleteProductionsAnnuel(id :number){
    return this.httpClient.delete(`${environment.urlApi}`+"/ProductionsAnnuel/"+id);
  }

  UpdateProductionsAnnuel(AnneeProduction: AnneeProduction, id: number) {
    return this.httpClient.put(`${environment.urlApi}/ProductionsAnnuel/`+id,JSON.stringify(AnneeProduction),this.httpOptions);

  }
}
