import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProprietairesRoutingModule } from './proprietaires-routing.module';
import {ListComponent} from './list/list.component';
import {AddComponent} from './add/add.component';
import { ProprietairesComponent } from './proprietaires.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProprietairesService} from '../../_service/proprietaires.service';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [ListComponent,AddComponent, ProprietairesComponent, UpdateComponent],
  imports: [
    CommonModule,
    ProprietairesRoutingModule,
    ReactiveFormsModule,NgbPaginationModule

  ],
  providers:[ProprietairesService]

})
export class ProprietairesModule { }
