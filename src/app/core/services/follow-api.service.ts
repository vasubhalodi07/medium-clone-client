import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FollowApiService {
  followUserApi: string = environment.baseUrl + environment.followUser;
  unfollowUserApi: string = environment.baseUrl + environment.unfollowUser;
  fetchFollowingApi: string = environment.baseUrl + environment.fetchFollowing;
  fetchFollowersApi: string = environment.baseUrl + environment.fetchFollowers;

  constructor(private httpClient: HttpClient) {}

  followUser(id: any) {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.post(this.followUserApi + '/' + id, null, {
      headers,
    });
  }

  unfollowUser(id: any) {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.delete(this.unfollowUserApi + '/' + id, {
      headers,
    });
  }

  fetchFollowing(id: any) {
    return this.httpClient.get(this.fetchFollowingApi + '/' + id);
  }

  fetchFollowers(id: any) {
    return this.httpClient.get(this.fetchFollowersApi + '/' + id);
  }
}
