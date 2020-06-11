import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private apiPath = 'api/entries';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handlerError),
      map(this.jsonDataToEntries),
    );
  }

  getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handlerError),
      map(this.jsonDataToEntry),
    );
  }

  create(entry: Entry): Observable<Entry> {
    return this.http.post(this.apiPath, entry).pipe(
      catchError(this.handlerError),
      map(this.jsonDataToEntry),
    );
  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;
    return this.http.put(url, entry).pipe(
      catchError(this.handlerError),
      map(() => entry),
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handlerError),
      map(() => null),
    );
  }

  private jsonDataToEntries(jsonData: any[]) {
    const entries: Entry[] = [];
    jsonData.forEach(element => entries.push(element as Entry));
    return entries;
  }

  private jsonDataToEntry(jsonData: any) {
    return jsonData as Entry;
  }

  private handlerError(error: any): Observable<any> {
    console.log(`Error na requisição => ${error}`);
    return throwError(error);
  }
}
