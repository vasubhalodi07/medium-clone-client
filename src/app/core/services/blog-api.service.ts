import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BlogApiService {
  fetchBlogApi: string = environment.baseUrl + environment.fetchBlog;
  fetchBlogByUserIdApi: string =
    environment.baseUrl + environment.fetchBlogByUserId;
  addBlogApi: string = environment.baseUrl + environment.addBlog;
  deleteBlogApi: string = environment.baseUrl + environment.deleteBlog;
  updateBlogApi: string = environment.baseUrl + environment.updateBlog;

  constructor(private httpClient: HttpClient) {}

  fetchBlogs(search: any) {
    return this.httpClient.get(`${this.fetchBlogApi}?search=${search}`);
  }

  fetchBlogById(id: string) {
    return this.httpClient.get(`${this.fetchBlogApi}/${id}`);
  }

  fetchBlogByUserId(user_id: any) {
    return this.httpClient.get(`${this.fetchBlogByUserIdApi}/${user_id}`);
  }

  addBlog(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.post(this.addBlogApi, data, { headers });
  }

  deleteBlog(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.patch(`${this.deleteBlogApi}/${id}`, { headers });
  }

  updateBlog(id: any, data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.put(`${this.updateBlogApi}/${id}`, data, {
      headers,
    });
  }
}
