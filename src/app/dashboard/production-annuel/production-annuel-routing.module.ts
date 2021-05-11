import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductionAnnuelComponent} from './production-annuel.component';
import {AuthGuard} from '../../_helpers/auth.guard';


const routes: Routes = [
  {path:'',component:ProductionAnnuelComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionAnnuelRoutingModule { }
