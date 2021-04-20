import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './list/list.component';
import {AddComponent} from './add/add.component';
 import {ProprietairesComponent} from './proprietaires.component';


const routes: Routes = [

  {path:"",component:ProprietairesComponent,children:[
      {path:"add",component:AddComponent},
      {path:"list",component:ListComponent},
      { path: '',   redirectTo: 'list', pathMatch: 'full' }, // redirect to `

    ]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProprietairesRoutingModule { }
