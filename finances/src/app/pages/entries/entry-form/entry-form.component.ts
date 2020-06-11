import { EntryService } from './../shared/entry.service';
import { Entry } from './../shared/entry.model';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import toastr from 'toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-entries-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  // NEW or Edit + ID
  currentAction: string;
  entryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm = false;
  entries: Entry = new Entry();

  constructor(
    private entriesService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction === 'new') {
      this.createEntry();
    } else {
      this.updateEntry();
    }
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
  }

  private loadEntry() {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(switchMap(params => this.entriesService.getById(+params.get('id'))))
        .subscribe(
          response => {
            this.entries = response;
            this.entryForm.patchValue(response);
          },
          error => alert('Server Error')
        );
    }
  }

  private setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Register new Entry';
    } else {
      const entriesName = this.entries.name || '';
      this.pageTitle = `Edit Entry: ${entriesName}`;
    }

  }

  private createEntry() {
    const entries: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entriesService.create(entries).subscribe(
      response => this.actionsForSuccess(response),
      error => this.actionsForError(error)
    );
  }

  private updateEntry() {
    const entries: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entriesService.update(entries).subscribe(
      response => this.actionsForSuccess(response),
      error => this.actionsForError(error)
    );

  }

  private actionsForSuccess(entries: Entry) {
    toastr.success('Request processed successfully');

    // load component, não colocar o histórico de navegacao para a página anterior
    this.router.navigateByUrl('entries', { skipLocationChange: false }).then(
      () => this.router.navigate(['entries', entries.id, 'edit'])
    );
  }

  private actionsForError(error) {
    toastr.error('There was an error processing your request');
    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Failed to communicate with the server, try later'];
    }
  }

}
