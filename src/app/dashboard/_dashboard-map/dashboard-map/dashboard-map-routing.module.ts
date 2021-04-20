import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardMapComponent} from './dashboard-map.component';


const routes: Routes = [
  {path:'',component:DashboardMapComponent,children:[

    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardMapRoutingModule { }
