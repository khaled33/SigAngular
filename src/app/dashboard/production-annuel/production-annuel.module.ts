import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionAnnuelRoutingModule } from './production-annuel-routing.module';
import { ProductionAnnuelComponent } from './production-annuel.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ProductionAnnuelComponent],
  imports: [
    CommonModule,
    ProductionAnnuelRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductionAnnuelModule { }
