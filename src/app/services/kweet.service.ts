import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { Kweet } from '../models/kweet';

@Injectable({
  providedIn: 'root'
})
export class KweetService {

  API_URL = 'http://localhost:8080/Kwetter/api/kweet'

  constructor(private http: HttpClient) { }

  likeKweet(id:Number, username: String): Observable<Response> {
    return this.http.put<Response>(this.API_URL + `/${id}/like/${username}`, {})
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
  }
}
