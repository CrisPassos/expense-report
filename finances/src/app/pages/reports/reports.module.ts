import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports/reports.component';


@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    SharedModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
