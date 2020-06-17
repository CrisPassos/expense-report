import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';


// coisa que são compartilhadas, mas não são obrigatórias
// exemplo: mensagem de error, diretivas, pipes
@NgModule({
  declarations: [
    BreadCrumbComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BreadCrumbComponent,
  ]
})
export class SharedModule { }
