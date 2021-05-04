import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionAnnuelRoutingModule } from './production-annuel-routing.module';
import { ProductionAnnuelComponent } from './production-annuel.component';
import {ReactiveFormsModule} from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [ProductionAnnuelComponent],
  imports: [
    CommonModule,NgxChartsModule,
    ProductionAnnuelRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductionAnnuelModule { }
