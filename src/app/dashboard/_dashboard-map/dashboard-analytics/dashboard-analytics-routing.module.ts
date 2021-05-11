import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import {DashboardAnalyticsComponent} from './dashboard-analytics.component';
import {AuthGuard} from '../../../_helpers/auth.guard';


const routes: Routes = [
  {path:'',component:DashboardAnalyticsComponent,canActivate: [AuthGuard],children:[

    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardAnalyticsRoutingModule { }
