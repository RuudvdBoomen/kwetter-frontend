import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap } from "rxjs/operators";

import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  API_URL = 'http://localhost:8080/Kwetter/api'

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<Object> {
    return this.http.post(this.API_URL + '/auth/register', user)
      .pipe(catchError(this.errorHandler));
  }

  login(userCredentials: any) {
    return this.http.post<Object>(this.API_URL + '/auth/login', userCredentials, { observe: 'response' })
      .pipe(tap((res) => {
        this.setSession(res.headers.get("Authorization").slice(7)) // Slice "Bearer "
      }))
  }

  findUserByUsername(username: String): Observable<Object> {
    return this.http.get(this.API_URL + `/user/${username}`)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
  }

  private setSession(token) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem("token");
  }

  public isLoggedIn() {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token)
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

}
