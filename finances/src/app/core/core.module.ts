import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// memory-api: todas as requisicoes serao interceptadas pelo HttpClientInMemory
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from '../in-memoy-db';

// serviços e modulos obrigatório para o sistema funcionar
// exemplo header, footer
// singleton, auth guards routes, services (token service)

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
  ],
  exports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
})
export class CoreModule { }
