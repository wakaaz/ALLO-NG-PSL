import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LocalStorageSerivce } from './local-storage-serivce';

@Injectable({
  providedIn: 'root'
})
export class RestSerivce {

  authOptions: any;
  options: any;
  API_URL: any;
  token: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageSerivce: LocalStorageSerivce
  ) {
    this.API_URL = `${environment.API_URL}/api`;
  }

  private getOptions(): any {
    this.token = this.localStorageSerivce.getItem('api_token');
    if (!this.token) {
      this.postAuth('/GuestLogin')
        .subscribe(x => {
          this.localStorageSerivce.setItem('api_token', x);
          this.token = x;
        });
    }
    // }

    // const token = `Bearer ${this.token}`;
    const token = `${this.token}`;
    const header = new HttpHeaders({
      session: `${token}`,
      usertype: 'guest'
    });
    this.options = { headers: header };
    return this.options;
  }

  public getRequest<T>(link: string): Observable<any> {
    return this.http.get<T>(`${this.API_URL}${link}`, this.getOptions())
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  public postRequest(link: string, model: any): Observable<any> {
    return this.http.post(`${this.API_URL}${link}`, model, this.getOptions())
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  public postAuth(link: string): Observable<any> {
    return this.http.post(`${this.API_URL}${link}`, {})
      .pipe(
        retry(0),
        catchError(this.handleError)
      ).pipe(map(x => x.object.session));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      this.router.navigateByUrl('/serverError');
    } else {
      if (error.status === 410) {
      }
      console.log(error);
    }

    // return an ErrorObservable with a user-facing error message
    return observableThrowError(
      error);
  }
}
