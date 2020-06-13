import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form-component';
import { CategoryService } from './../../categories/shared/category.service';
import { Category } from './../../categories/shared/category.model';
import { EntryService } from './../shared/entry.service';
import { Entry } from './../shared/entry.model';
import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-entries-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {

  categories: Array<Category>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  constructor(
    protected entriesService: EntryService,
    protected categoriesService: CategoryService,
    protected injector: Injector,
  ) {
    super(injector, new Entry(), entriesService, Entry.fromJson);
  }


  get typeOptions(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          value, text
        };
      }
    );
  }

  ngOnInit() {
    this.loadCategories();
    super.ngOnInit();
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ['expense', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
  }

  protected creationPageTitle(): string {
    return 'Register new Entry';
  }

  protected editionPageTitle(): string {
    const categoryName = this.resource.name || '';
    return `Edit entry: ${categoryName}`;
  }


  protected loadCategories() {
    this.categoriesService.getAll().subscribe(
      response => this.categories = response
    );
  }
}
