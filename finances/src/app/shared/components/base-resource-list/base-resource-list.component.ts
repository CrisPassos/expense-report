import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { OnInit } from '@angular/core';


export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {
  resources: T[] = [];

  constructor(protected resourceService: BaseResourceService<T>) { }

  ngOnInit() {
    this.resourceService.getAll().subscribe(
      response => this.resources = response.sort((a, b) => b.id - a.id),
      error => console.log(`Error ${error}`)
    );
  }

  remove(resource: T) {
    const mustDelete = confirm('You like to remove?');

    if (mustDelete) {
      this.resourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(element => element !== resource),
        error => alert('Error in remove')
      );
    }
  }

}
