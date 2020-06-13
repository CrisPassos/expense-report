import { EntryService } from './../shared/entry.service';
import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {

  constructor(protected entryService: EntryService) {
    super(entryService);
  }
}
