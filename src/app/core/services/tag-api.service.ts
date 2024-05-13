import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TagApiService {
  fetchTagApi: string = environment.baseUrl + environment.fetchTags;

  constructor(private httpClient: HttpClient) {}

  fetchTags() {
    return this.httpClient.get(this.fetchTagApi);
  }
}
