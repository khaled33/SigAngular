import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductionAnnuelComponent} from './production-annuel.component';


const routes: Routes = [
  {path:'',component:ProductionAnnuelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionAnnuelRoutingModule { }
