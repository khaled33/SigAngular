import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Proprietaires} from '../_model/proprietaires';
import {Injectable} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ProprietairesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': 'true'
    })
  };

  constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService) {
  }

  addproprietaires(Proprietaires: Proprietaires) {
    this.spinner.show();

    return this.httpClient.post(`${environment.urlApi}/Proprietaires`, JSON.stringify(Proprietaires), this.httpOptions).pipe(
      tap(response => {

          this.toastr.success('l\'enregistrement a été effectué avec succès', 'Proprietaires', {positionClass: 'toast-bottom-right'});
          this.spinner.hide();
        },
        (error: any) => {
          this.toastr.error('erreur d\'enregistrement', 'Proprietaires', {positionClass: 'toast-bottom-right'});

          this.spinner.hide();
        }
      )
    );
  }

  getPageProprietaires(pageSize: number, pageNumber: number) {
    this.spinner.show();

    return this.httpClient.get(`${environment.urlApi}` + '/ProprietairesPage?pageSize=' + pageSize + '&pageNumber=' + pageNumber).pipe(
      tap(response => this.spinner.hide(),
        (error: any) => {
          this.toastr.error('erreur ', 'Proprietaires', {positionClass: 'toast-bottom-right'});

          this.spinner.hide();
        }
      )
    );
  }

  getProprietairesByNumCartCin(cin: String) {
    this.spinner.show();

    return this.httpClient.get<Proprietaires>(`${environment.urlApi}` + '/Proprietaires/cin/' + cin).pipe(
      tap(response => this.spinner.hide(),
        (error: any) => {
          this.toastr.error('erreur ', 'Proprietaires', {positionClass: 'toast-bottom-right'});

          this.spinner.hide();
        }
      )
    );
  }

  DeleteProprietaires(id: number) {
    this.spinner.show();

    return this.httpClient.delete(`${environment.urlApi}` + '/Proprietaires/' + id).pipe(
      tap(response => this.spinner.hide(),
        (error: any) => this.spinner.hide()
      )
    );
    ;
  }

  Updateproprietaires(p: Proprietaires, id: number) {
    this.spinner.show();

    return this.httpClient.put(`${environment.urlApi}/Proprietaires/` + id, JSON.stringify(p), this.httpOptions).pipe(
      tap(response => {

          this.toastr.success('le mettre à jour du Proprietaire a été effectué avec succès', 'Proprietaires', {positionClass: 'toast-bottom-right'});
          this.spinner.hide();
        },
        (error: any) => {
          this.toastr.error('erreur du mettre à jour  ', 'Proprietaires', {positionClass: 'toast-bottom-right'});

          this.spinner.hide();
        }
      )
    );

  }
}
