import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VergersComponent} from './vergers.component';
import {ListComponent} from './list/list.component';
import {AddComponent} from './add/add.component';



const routes: Routes = [

  {path:"",component:VergersComponent,children:[
      {path:"add",component:AddComponent},
      {path:"list",component:ListComponent},
      { path: '',   redirectTo: 'list', pathMatch: 'full' }, // redirect to `

    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VergersRoutingModule { }
