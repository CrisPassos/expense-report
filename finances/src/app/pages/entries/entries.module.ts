import { SharedModule } from './../../shared/shared.module';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { NgModule } from '@angular/core';

import { EntriesRoutingModule } from './entries-routing.module';
import { IMaskModule } from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [
    SharedModule,
    EntriesRoutingModule,
    IMaskModule,
    CalendarModule,
  ]
})
export class EntriesModule { }
