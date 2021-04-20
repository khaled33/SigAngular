import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';


const routes: Routes = [
  {path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),canActivate: []
  },
  {
    path:'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),canActivate: []

  },
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
