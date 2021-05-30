import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Proprietaires} from '../_model/proprietaires';
import {environment} from '../../environments/environment';
import {Vergers} from '../_model/vergers';
import {NgxSpinnerService} from 'ngx-spinner';
import {tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {User} from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': 'true'
    })
  };

  constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService,) {
  }

  RegisterUser(User: User) {
    this.spinner.show();
    return this.httpClient.post(`${environment.urlApi}/Register`, JSON.stringify(User), this.httpOptions).pipe(
      tap(response => {

          this.toastr.success('l\'enregistrement a été effectué avec succès', 'User');
          this.spinner.hide();
        },
        (error: any) => {
          this.toastr.error('erreur d\'enregistrement '+error.error.message, 'User');

          this.spinner.hide();
        }
      )
    );
  }

  getCorrentUser() {
    this.spinner.show();
    return this.httpClient.get<User>(`${environment.urlApi}` + '/User').pipe(
      tap(response => this.spinner.hide(),
        (error: any) => {
          this.toastr.error('erreur ', 'User');

          this.spinner.hide();
        }
      )
    );
  }
  //
  // DeleteVergers(id: number) {
  //   this.spinner.show();
  //   return this.httpClient.delete(`${environment.urlApi}` + '/Vergers/' + id).pipe(
  //     tap(response => this.spinner.hide(),
  //       (error: any) => this.spinner.hide()
  //     )
  //   );
  // }
  //
  UpdateUser(user: User) {
    this.spinner.show();
    return this.httpClient.put(`${environment.urlApi}/UpdateUser`, JSON.stringify(user), this.httpOptions).pipe(
      tap(response => {

          this.toastr.success('le mettre à jour  a été effectué avec succès', 'User');
          this.spinner.hide();
        },
        (error: any) => {
          this.toastr.error('erreur du mettre à jour ', 'User');

          this.spinner.hide();
        }
      )
    );

  }
}
