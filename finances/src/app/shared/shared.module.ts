import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// coisa que são compartilhadas, mas não são obrigatórias
// exemplo: mensagem de error, diretivas, pipes
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
