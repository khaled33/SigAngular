import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardMapRoutingModule } from './dashboard-map-routing.module';
import {FormsModule, } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import{ListboxModule}from'primeng/listbox';
import {DashboardMapComponent} from './dashboard-map.component';

@NgModule({
  declarations: [DashboardMapComponent],
  imports: [
    CommonModule,FormsModule,ListboxModule,
    DashboardMapRoutingModule,DialogModule
  ]
})
export class DashboardMapModule { }
