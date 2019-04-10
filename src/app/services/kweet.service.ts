import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { Kweet } from '../models/kweet';
import { Hashtag } from '../models/hashtag';

@Injectable({
  providedIn: 'root'
})
export class KweetService {

  API_URL = 'http://localhost:8080/Kwetter/api'

  constructor(private http: HttpClient) { }

  likeKweet(id: Number, username: String): Observable<Response> {
    return this.http.put<Response>(this.API_URL + `/kweet/${id}/like/${username}`, {})
      .pipe(catchError(this.errorHandler));
  }

  createKweet(kweet: Object, username: String): Observable<Response> {
    return this.http.post<Response>(this.API_URL + `/kweet/${username}`, kweet)
      .pipe(catchError(this.errorHandler));
  }

  getTrendingHashtags(): Observable<Hashtag[]> {
    return this.http.get<Hashtag[]>(this.API_URL + `/hashtag`)
      .pipe(catchError(this.errorHandler));
  }

  getMentions(username: String): Observable<Kweet[]> {
    return this.http.get<Kweet[]>(this.API_URL + `/kweet/${username}/mentions`)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
  }
}
