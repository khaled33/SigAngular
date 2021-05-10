import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {ListboxModule} from 'primeng/listbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {DialogModule} from 'primeng/dialog';
import { LoginComponent } from './login/login.component';
import {LoginModule} from './login/login.module';
import {DashboardModule} from './dashboard/dashboard.module';
import { LeftSidebarComponent } from './dashboard/left-sidebar/left-sidebar.component';
import {ProprietairesService} from './_service/proprietaires.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ListboxModule} from 'primeng/listbox';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {RegisterModule} from './register/register.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,


  ],
  imports: [
    ListboxModule,
    BrowserModule, DialogModule,
    AppRoutingModule, FormsModule,ReactiveFormsModule,
    BrowserAnimationsModule,  HttpClientModule,
    LoginModule, DashboardModule,RegisterModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 5000,
      enableHtml: true,
      // progressAnimation: 'decreasing',
      positionClass: 'toast-bottom-right',

    }),
   ],
  providers: [NgxSpinnerService,ToastrService],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
