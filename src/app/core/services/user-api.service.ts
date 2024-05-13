import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  loginUrl: string = environment.baseUrl + environment.loginUser;
  registerUrl: string = environment.baseUrl + environment.registerUser;
  checkUserUrl: string = environment.baseUrl + environment.checkUser;
  userCheckTokenUrl: string = environment.baseUrl + environment.userTokenUser;
  fetchUserUrl: string = environment.baseUrl + environment.fetchUser;
  fetchUserByIdUrl: string = environment.baseUrl + environment.fetchUserById;
  updateUserDetailsUrl: string =
    environment.baseUrl + environment.updateUserDetails;

  constructor(private httpClient: HttpClient) {}

  loginUser(email: string) {
    return this.httpClient.post(this.loginUrl, {
      email,
    });
  }

  registerUser(email: string) {
    return this.httpClient.post(this.registerUrl, {
      toMail: email,
    });
  }

  checkToken(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post(this.checkUserUrl, null, { headers });
  }

  userCheckToken(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(this.userCheckTokenUrl, { headers });
  }

  fetchUser() {
    return this.httpClient.get(this.fetchUserUrl);
  }

  fetchUserById(id: any) {
    return this.httpClient.get(this.fetchUserByIdUrl + '/' + id);
  }

  updateUserDetails(id: any, body: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.put(this.updateUserDetailsUrl + '/' + id, body, {
      headers,
    });
  }
}
