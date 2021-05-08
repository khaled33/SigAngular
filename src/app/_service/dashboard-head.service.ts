import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Proprietaires} from '../_model/proprietaires';
import {environment} from '../../environments/environment';
import {Vergers} from '../_model/vergers';
import {DashboardHeadStatistic} from '../_model/DashboardHeadStatistic';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardHeadService {
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type':'application/json', 'Access-Control-Allow-Credentials': 'true'})
  };
  constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  getDashboardHead(){
    this.spinner.show();

    return this.httpClient.get<DashboardHeadStatistic>(`${environment.urlApi}`+"/DashboardHeadStatistic").pipe(
      tap(response => this.spinner.hide(),
        (error: any) => {
          this.toastr.error('erreur ');

          this.spinner.hide();
        }
      )
    );

  }

}
