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
    // if (JSON.parse(localStorage.getItem('userInfo'))) {
    //   this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // } else {
    // localStorage.setItem('api_token', JSON.stringify(
    //   { token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU1NDA2YjRiMWE5OTNmOTU5OWU2ZTE0ZDliMTZkYWNhNTgyYTVhZTgyNTk5Y2Y0YjhhZWEzMjIyOTkwMjAyN2YzYzQxOGUzNTE3Y2FmNDM5In0.eyJhdWQiOiIxIiwianRpIjoiZTU0MDZiNGIxYTk5M2Y5NTk5ZTZlMTRkOWIxNmRhY2E1ODJhNWFlODI1OTljZjRiOGFlYTMyMjI5OTAyMDI3ZjNjNDE4ZTM1MTdjYWY0MzkiLCJpYXQiOjE2MDIyNDc2ODUsIm5iZiI6MTYwMjI0NzY4NSwiZXhwIjoxNjMzNzgzNjg1LCJzdWIiOiI0NSIsInNjb3BlcyI6W119.3q6ptCG1gXqzHRPIraisE561KboiO6OPy3AIvWRF3m_5luotUG1hFM4gYjRzQibiKHAHPc5DWyVkV4KjgoP7xkqTKC9XzaO5waVL09v2Z-N44cSmrL1i3WXU44ya0jen1-7sFYqitlbbm_1nnINjdXOvr_G2q_OrOK7WN4DZHsh7v4IZZjbVhyE3d1EjQJaR690_a2OE4ofNGAJcnK-LPpu6cN6cZfZEa_QAA_ApP6LrikekzU9mlm0ctxb9-6uqm05vw4bInBzS-cT_kqx8gaSS4I2I5gOPsAW_yw6HFWEjK_gJ3XNFuHRk918l3ZuEfS-QNQqx6cVlSoo5lAr_qCPUID0YXj68rFIUr2AA-EsuokQXOTYzVEfrwSRZkyRktHkxuFfcH-H5-yxmiUoVu-yNCjzSmiR_q9nQF0SK3Pc9nojdtX52XuGcGoujSqwaw5lp9-tJFxi2D0a8vz58OGKIaITKQGrgg9Tj-CK0H9npElHPJnqcYpya1mwg7ymIeq0zQ-T-FeFN0JWuGMlb_7_6dF1qqgSFSkbg7eS0jRjT_E9qv3vJAUOMVn8Sw4at4dOiq5PouOAEfGRpDHr2kWREHnqFTdiFmdh-UmEk-6JINe1f1s3o0HgSl-6xAjY6-5EvdCn_bM9k2AZv3r8-dws9tepcrSTCzEmA82i2m8c' }
    // ));
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
      session: `${token}`
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
