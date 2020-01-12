import { Observable, of } from 'rxjs';

import { LoginContext } from './authentication.service';
import { Credentials } from './credentials.service';

export class MockAuthenticationService {
  credentials: Credentials | null = {
    email: 'context.email',
    name: 'william',
    gender: 'masculino',
    token: '123456'
  };

  login(context: LoginContext): Observable<Credentials> {
    return of({
      email: context.email,
      name: 'william',
      gender: 'masculino',
      token: '123456'
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }
}
