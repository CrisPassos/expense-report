import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injector } from '@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel> {
  protected http: HttpClient;

  constructor(protected apiPath: string, protected injector: Injector, protected jsonDataToResourceFn: (jsonData: any) => T) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http.get(this.apiPath).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handlerError),
    );
  }

  getById(id: number): Observable<T> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handlerError),
    );
  }

  create(resource: T): Observable<T> {
    return this.http.post(this.apiPath, resource).pipe(
      map(this.jsonDataToResource),
      catchError(this.handlerError),
    );
  }

  update(resource: T): Observable<T> {
    const url = `${this.apiPath}/${resource.id}`;
    return this.http.put(url, resource).pipe(
      map(() => resource),
      catchError(this.handlerError),
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      map(() => null),
      catchError(this.handlerError),
    );
  }

  // torna o método visivel na classe base e nas que herdarem
  protected jsonDataToResources(jsonData: any[]) {

    const resources: T[] = [];
    jsonData.forEach(element => resources.push(this.jsonDataToResourceFn(element)));

    return resources;
  }

  protected jsonDataToResource(jsonData: any) {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handlerError(error: any): Observable<any> {
    console.log(`Request Error => ${error}`);
    return throwError(error);
  }

}
