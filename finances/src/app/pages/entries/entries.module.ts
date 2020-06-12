import { ReactiveFormsModule } from '@angular/forms';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { IMaskModule } from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ReactiveFormsModule,
    IMaskModule,
    CalendarModule,
  ]
})
export class EntriesModule { }
