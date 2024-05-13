import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentApiService {
  fetchCommentApi: string = environment.baseUrl + environment.fetchComment;
  addCommentApi: string = environment.baseUrl + environment.addComment;
  deleteCommentApi: string = environment.baseUrl + environment.deleteComment;
  updateCommentApi: string = environment.baseUrl + environment.updateComment;

  constructor(private httpClient: HttpClient) {}

  fetchComment(blog_id: any) {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get(this.fetchCommentApi + '/' + blog_id, {
      headers,
    });
  }

  addComment(data: any) {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.post(this.addCommentApi, data, { headers });
  }

  deleteComment(id: any) {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.patch(this.deleteCommentApi + '/' + id, null, {
      headers,
    });
  }

  updateComment(id: any, data: any) {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.put(
      this.updateCommentApi + '/' + id,
      {
        message: data,
      },
      {
        headers,
      }
    );
  }
}
