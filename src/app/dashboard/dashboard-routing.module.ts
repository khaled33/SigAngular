import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {AuthGuard} from '../_helpers/auth.guard';


const routes: Routes = [

  {
    path: '', component: DashboardComponent, children: [

      {
        path: 'proprietaires',
        loadChildren: () => import('./proprietaires/proprietaires.module').then(m => m.ProprietairesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'vergers', loadChildren: () => import('./vergers/vergers.module').then(m => m.VergersModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'Map',
        loadChildren: () => import('./_dashboard-map/dashboard-map/dashboard-map.module').then(m => m.DashboardMapModule),
        canActivate: [AuthGuard]
      },

      {
        path: 'Analytics',
        loadChildren: () => import('./_dashboard-map/dashboard-analytics/dashboard-analytics.module').then(m => m.DashboardAnalyticsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'ProductionAnnuel',
        loadChildren: () => import('./production-annuel/production-annuel.module').then(m => m.ProductionAnnuelModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard]
      },
      // redirect to `
      {path: '', redirectTo: '/dashboard/Analytics', pathMatch: 'full',canActivate: [AuthGuard]}, // redirect to `
    ]

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
