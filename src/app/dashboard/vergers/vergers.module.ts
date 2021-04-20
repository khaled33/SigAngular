import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VergersRoutingModule } from './vergers-routing.module';
import { VergersComponent } from './vergers.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import {FormsModule} from '@angular/forms';

import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [VergersComponent, AddComponent, ListComponent],
  imports: [
    CommonModule,
    VergersRoutingModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class VergersModule { }
