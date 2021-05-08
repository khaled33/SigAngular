import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Proprietaires} from '../_model/proprietaires';
import {environment} from '../../environments/environment';
import {Vergers} from '../_model/vergers';
import {DashboardHeadStatistic} from '../_model/DashboardHeadStatistic';
import {pieChart} from '../_model/pieChart';
import {tap} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PieChartService {
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type':'application/json', 'Access-Control-Allow-Credentials': 'true'})
  };
  constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  getDataPieCharSexe(){
    this.spinner.show();

    return this.httpClient.get<pieChart[]>(`${environment.urlApi}`+"/PieCharSexe").pipe(
      tap(response => this.spinner.hide(),
        (error: any) => {
          this.toastr.error('erreur ', );

          this.spinner.hide();
        }
      )
    );
  }

}
