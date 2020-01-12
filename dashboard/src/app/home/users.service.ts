import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CredentialsService } from '@app/core/authentication/credentials.service';

const routes = {
  quote: (c: RandomQuoteContext) => `/jokes/random?category=${c.category}`
};

export interface RandomQuoteContext {
  // The quote's category: 'dev', 'explicit'...
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private httpClient: HttpClient,
    private http: HttpClient,
    private creadentialsService: CredentialsService
  ) {}

  getRandomQuote(context: RandomQuoteContext): Observable<string> {
    return this.httpClient
      .cache()
      .get(routes.quote(context))
      .pipe(
        map((body: any) => body.value),
        catchError(() => of('Error, could not load joke :-('))
      );
  }

  getUsers(context: any): Observable<any> {
    return this.http
      .get('http://localhost:3334/api/users', {
        headers: { Authorization: `Bearer ${this.creadentialsService.credentials.token}` }
      })
      .pipe(
        map((res: any) => {
          if (!res.error) {
            return res;
          } else {
            return res;
          }
        })
      );
  }

  editUser(user: any): Observable<any> {
    return this.http
      .put(`http://localhost:3334/api/users`, user, {
        headers: { Authorization: `Bearer ${this.creadentialsService.credentials.token}` }
      })
      .pipe(
        map((res: any) => {
          if (!res.error) {
            return res;
          } else {
            return res;
          }
        })
      );
  }

  deleteUser(context: any): Observable<any> {
    return this.http
      .delete(`http://localhost:3334/api/users/${context}`, {
        headers: { Authorization: `Bearer ${this.creadentialsService.credentials.token}` }
      })
      .pipe(
        map((res: any) => {
          if (!res.error) {
            return res;
          } else {
            return res;
          }
        })
      );
  }
}
