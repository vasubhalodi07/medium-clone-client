import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LikeApiService {
  addLikeApi: string = environment.baseUrl + environment.addLike;
  removeLikeApi: string = environment.baseUrl + environment.removeLike;

  constructor(private httpClient: HttpClient) {}

  addLike(id: any) {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.post(this.addLikeApi + '/' + id, null, { headers });
  }

  removeLike(id: any) {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.delete(this.removeLikeApi + '/' + id, {
      headers,
    });
  }
}
