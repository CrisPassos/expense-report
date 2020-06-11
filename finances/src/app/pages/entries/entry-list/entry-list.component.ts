import { EntryService } from './../shared/entry.service';
import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {
  entries: Entry[] = [];

  constructor(private entryService: EntryService, ) { }

  ngOnInit() {
    this.entryService.getAll().subscribe(
      response => this.entries = response,
      error => console.log(`Error ${error}`)
    );
  }

  remove(entry: Entry) {
    const mustDelete = confirm('You like to remove?');

    if (mustDelete) {
      this.entryService.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element !== entry),
        error => alert('Error in remove')
      );
    }
  }

}
