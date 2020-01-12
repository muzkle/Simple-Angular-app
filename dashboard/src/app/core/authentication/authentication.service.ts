import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private http: HttpClient) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<any> {
    // Replace by proper authentication call

    return this.http.post('http://localhost:3334/api/users/login', context).pipe(
      map((res: any) => {
        if (!res.error) {
          this.credentialsService.setCredentials(res, context.remember);
          return res;
        } else {
          return res;
        }
      })
    );
  }

  register(context: any): Observable<any> {
    // Replace by proper authentication call

    return this.http.post('http://localhost:3334/api/users', context).pipe(
      map((res: any) => {
        if (!res.error) {
          console.log(res);
          this.credentialsService.setCredentials(res, true);
          return res;
        } else {
          return res;
        }
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
