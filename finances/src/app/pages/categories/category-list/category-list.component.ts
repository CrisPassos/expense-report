import { CategoryService } from './../shared/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, ) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      response => this.categories = response,
      error => console.log(`Error ${error}`)
    );
  }

  remove(category: Category) {
    const mustDelete = confirm('You like to remove?');

    if (mustDelete) {
      this.categoryService.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(element => element !== category),
        error => alert('Error in remove')
      );
    }
  }

}
