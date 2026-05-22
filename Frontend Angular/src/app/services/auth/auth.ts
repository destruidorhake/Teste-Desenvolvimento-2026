import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      this.apiUrl + '/login',
      {
        username,
        password
      },
    {
      responseType: 'text',
      withCredentials: true
    }
  );
}

  logout(): void {

    sessionStorage.clear();
  }

  isAuthenticated(): boolean {

    return sessionStorage.getItem('logged') === 'true';
  }
}
