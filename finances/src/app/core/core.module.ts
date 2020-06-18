import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// memory-api: todas as requisicoes serao interceptadas pelo HttpClientInMemory
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from '../in-memoy-db';
import { NavbarComponent } from './components/navbar/navbar.component';

// serviços e modulos obrigatório para o sistema funcionar
// exemplo header, footer
// singleton, auth guards routes, services (token service)

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    RouterModule
  ],
  exports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NavbarComponent,
  ],
})
export class CoreModule { }
