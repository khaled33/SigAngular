import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';


const routes: Routes = [

   {
    path:'',component:DashboardComponent,children: [

       {
         path:'proprietaires', loadChildren: () => import('./proprietaires/proprietaires.module').then(m => m.ProprietairesModule),canActivate: []
       },
       {
         path:'vergers', loadChildren: () => import('./vergers/vergers.module').then(m => m.VergersModule),canActivate: []
       },
 {
         path:'Map', loadChildren: () => import('./_dashboard-map/dashboard-map/dashboard-map.module').then(m => m.DashboardMapModule),canActivate: []
       },

       { path: 'Analytics',   loadChildren: () => import('./_dashboard-map/dashboard-analytics/dashboard-analytics.module').then(m => m.DashboardAnalyticsModule),canActivate: [] },
       // redirect to `
       { path: '',   redirectTo: '/dashboard', pathMatch: 'full' }, // redirect to `
     ]

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
