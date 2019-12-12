import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MachineService {
  readonly endpoint = 'http://localhost:8888/api/';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }
  private extractData(res: Response) {
    return res || { };
  }
  getMachines(): Observable<any> {
    return this.http.post(this.endpoint + 'machines', {}).pipe(
      map(this.extractData));
  }
  getMachine(id): Observable<any> {
    return this.http.get(this.endpoint + 'machine/' + id).pipe(
      map(this.extractData));
  }
  addMachine(machine): Observable<any> {
    console.log(machine);
    return this.http.post<any>(this.endpoint + 'machine', JSON.stringify(machine), this.httpOptions).pipe(
      tap((newMachine) => console.log(`added machine with id=${newMachine.id}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
