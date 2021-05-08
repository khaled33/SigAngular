import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Proprietaires} from '../_model/proprietaires';
import {environment} from '../../environments/environment';
import {AnneeProduction} from '../_model/productions-annuel';
import {pieChart} from '../_model/pieChart';
import {tap} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductionsAnnuelService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': 'true'
    })
  };

  constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService) {
  }

  addProductionsAnnuel(ProductionsAnnuel: AnneeProduction) {
    this.spinner.show();

    return this.httpClient.post(`${environment.urlApi}/ProductionsAnnuel`, JSON.stringify(ProductionsAnnuel), this.httpOptions).pipe(
      tap(response => {

          this.toastr.success('l\'enregistrement a été effectué avec succès', 'Productions Annuel');
          this.spinner.hide();
        },
        (error: any) => {
          this.toastr.error('erreur d\'enregistrement', 'Productions Annuel');

          this.spinner.hide();
        }
      )
    );
  }

  getPageProductionsAnnuelPage(pageSize: number, pageNumber: number) {
    return this.httpClient.get(`${environment.urlApi}` + '/ProductionsAnnuelPage?pageSize=' + pageSize + '&pageNumber=' + pageNumber);
  }

  getPageProductionsAnnuel() {
    this.spinner.show();

    return this.httpClient.get<AnneeProduction[]>(`${environment.urlApi}` + '/ProductionsAnnuel').pipe(
      tap(response => this.spinner.hide(),
        (error: any) => {
          this.toastr.error('erreur ', 'Productions Annuel');

          this.spinner.hide();
        }
      )
    );
  }

  getBarChartProductionAnnuel() {
    this.spinner.show();

    return this.httpClient.get<pieChart[]>(`${environment.urlApi}` + '/BarChartProductionAnnuel').pipe(
      tap(response => this.spinner.hide(),
        (error: any) => {
          this.toastr.error('erreur ', 'Productions Annuel');

          this.spinner.hide();
        }
      )
    );
    ;
  }

  DeleteProductionsAnnuel(id: number) {
    this.spinner.show();

    return this.httpClient.delete(`${environment.urlApi}` + '/ProductionsAnnuel/' + id).pipe(
      tap(response => this.spinner.hide(),
        (error: any) => this.spinner.hide()
      )
    );
  }

  UpdateProductionsAnnuel(AnneeProduction: AnneeProduction, id: number) {
    this.spinner.show();

    return this.httpClient.put(`${environment.urlApi}/ProductionsAnnuel/` + id, JSON.stringify(AnneeProduction), this.httpOptions).pipe(
      tap(response => {

          this.toastr.success('le mettre à jour du Proprietaire a été effectué avec succès', 'Productions Annuel');
          this.spinner.hide();
        },
        (error: any) => {
          this.toastr.error('erreur du mettre à jour  ', 'Productions Annuel');

          this.spinner.hide();
        }
      )
    );

  }
}
