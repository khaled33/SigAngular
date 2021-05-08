import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAnalyticsRoutingModule } from './dashboard-analytics-routing.module';
import {DashboardAnalyticsComponent} from './dashboard-analytics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  declarations: [DashboardAnalyticsComponent],
  imports: [
    CommonModule,
    DashboardAnalyticsRoutingModule,
    NgxChartsModule,
    NgxSpinnerModule
  ]
})
export class DashboardAnalyticsModule { }
