import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// lazyloading
const routes: Routes = [
  { path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
