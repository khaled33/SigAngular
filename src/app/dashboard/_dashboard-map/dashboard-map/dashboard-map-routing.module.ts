import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardMapComponent} from './dashboard-map.component';
import {AuthGuard} from '../../../_helpers/auth.guard';


const routes: Routes = [
  {path:'',component:DashboardMapComponent,canActivate: [AuthGuard],children:[

    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardMapRoutingModule { }
