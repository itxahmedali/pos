import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private toaster: ToastrService,
    private authService: AuthService
  ) {}
  header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  get headerToken() {
    const token = localStorage.getItem('access_token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  post(url: string, data: any, token: boolean) {
    return this.http
      .post(
        environment.baseUrl + url,
        data,
        token ? this.headerToken : this.header
      )
      .pipe(catchError(this.handleError));
  }
  loaderPost(link: string, data: any, token: boolean) {
    LoaderService.loader.next(true);
    return this.http
      .post(
        environment.baseUrl + link,
        data,
        token ? this.headerToken : this.header
      )
      .pipe(
        finalize(() => LoaderService.loader.next(false)),
        catchError(this.handleError)
      );
  }

  get(url: string, token: boolean) {
    return this.http
      .get(environment.baseUrl + url, token ? this.headerToken : this.header)
      .pipe(catchError(this.handleError));
  }
  loaderGet(url: string, token: boolean) {
    LoaderService.loader.next(true);
    return this.http
      .get(environment.baseUrl + url, token ? this.headerToken : this.header)
      .pipe(
        finalize(() => LoaderService.loader.next(false)),
        catchError(this.handleError)
      );
  }
  handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      // this.authService.logout();
    } else {
      this.toaster.error(error.message);
    }
    return throwError(error.message || 'Server error');
  }
}
