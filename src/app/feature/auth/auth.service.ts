import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthAPI } from '@shared/api-end-points/auth-api-endpoint';
import { UserCredentials } from '@shared/models/user-credentials.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  validateUser(userCredentials: UserCredentials): Observable<any> {
    return this.http.post<any>(AuthAPI.validateUserUrl(), userCredentials, { reportProgress: true });
  }
}
