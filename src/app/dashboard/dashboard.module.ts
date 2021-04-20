import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {HeaderComponent} from './header/header.component';
import {LeftSidebarComponent} from './left-sidebar/left-sidebar.component';

import {ProprietairesModule} from './proprietaires/proprietaires.module';
import {ProprietairesService} from '../_service/proprietaires.service';
import { DashboardMapComponent } from './_dashboard-map/dashboard-map/dashboard-map.component';
import {ListboxModule} from 'primeng/listbox';
import {VergersModule} from './vergers/vergers.module';
import {DashboardMapModule} from './_dashboard-map/dashboard-map/dashboard-map.module';

// @ts-ignore
@NgModule({
  declarations: [DashboardComponent, HeaderComponent, LeftSidebarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule, ProprietairesModule, VergersModule,DashboardMapModule,ListboxModule,

  ],
})
export class DashboardModule {
}
