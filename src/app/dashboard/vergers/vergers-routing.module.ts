import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VergersComponent} from './vergers.component';
import {ListComponent} from './list/list.component';
import {AddComponent} from './add/add.component';
import {AuthGuard} from '../../_helpers/auth.guard';


const routes: Routes = [

  {
    path: '', component: VergersComponent,canActivate: [AuthGuard], children: [
      {path: 'add', component: AddComponent,canActivate: [AuthGuard]},
      {path: 'list', component: ListComponent,canActivate: [AuthGuard]},
      {path: '', redirectTo: 'list', pathMatch: 'full',canActivate: [AuthGuard]}, // redirect to `

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VergersRoutingModule {
}
