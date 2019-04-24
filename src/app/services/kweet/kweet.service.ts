import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Kweet } from '../../models/kweet';
import { Hashtag } from '../../models/hashtag';
import { WebsocketService } from '../websocket/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class KweetService {

  public newKweets: Subject<Kweet>;

  constructor(private http: HttpClient, @Inject('API_URL') private API_URL: string,
    wsService: WebsocketService) {
      this.newKweets = <Subject<Kweet>>wsService.connect("ws://localhost:8080/Kwetter/websocket").pipe(map(
      (response: MessageEvent): Kweet => {
        let data = JSON.parse(response.data);
        return {
          id: data.id,
          content: data.content,
          createdBy: data.username,
          likes: data.likes,
          postedOn: data.postedOn,
          profileImage: null
        };
      }
    ));
  }

  likeKweet(id: Number, username: String): Observable<Response> {
    return this.http.put<Response>(this.API_URL + `/kweet/${id}/like/${username}`, {})
      .pipe(catchError(this.errorHandler));
  }

  deleteKweet(id: Number): Observable<Response> {
    return this.http.delete<Response>(this.API_URL + `/kweet/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  createKweet(kweet: Object, username: String): Observable<Response> {
    return this.http.post<Response>(this.API_URL + `/kweet/${username}`, kweet)
      .pipe(catchError(this.errorHandler));
  }

  getKweetByContent(content: String) {
    return this.http.get<Kweet[]>(this.API_URL + `/kweet/${content}`)
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
