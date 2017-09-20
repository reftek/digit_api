import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AccountResponse } from '../models/responses/account';

@Injectable()
export class AccountsService {

  private baseUrl: string = environment.apiUrl + 'accounts';
  
  constructor(private http: HttpClient) { }

  create(body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.baseUrl, body, { headers })
  }

  get(id: string, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    const url = `${this.baseUrl}/${id}`;

    return this.http.get<AccountResponse>(url, { headers, params })
  }

  update(id: string, body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}`;

    return this.http.put<AccountResponse>(url, body, { headers })
  }

  delete(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete(url, { headers });
  }

  deleteMany(accounts: string[]) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/delete/bulk`;

    return this.http.post(url, { accounts }, { headers });
  }
}
