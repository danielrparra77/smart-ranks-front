import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICredentials, ISignInCredentials } from '../../interfaces/credentials.interface';
import { IService } from '../service';
import { catchError, Observable, tap } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends IService {

  backService = environment.backService;

  constructor(private http: HttpClient) {
    super();
  }

  signIn(credentials: ISignInCredentials): Observable<ICredentials> {
    return this.http.post<ICredentials>(this.backService+ 'user/login', credentials).pipe(
      tap(_ => this.log(`sign in success`)),
      catchError(this.handleError<ICredentials>(`credentials`))
    );
  }

  getUserbyId(_id: string): Observable<IUser> {
    return this.http.get<IUser>(this.backService+ 'user/singular', {params: {_id}}).pipe(
      tap(_ => this.log(`user found`)),
      catchError(this.handleError<IUser>(`user`))
    );
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.backService+ 'user').pipe(
      tap(_ => this.log(`users found`)),
      catchError(this.handleError<IUser[]>(`users`))
    );
  }

  upsertUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.backService+ 'user', user).pipe(
      tap(_ => this.log(`user updated`)),
      catchError(this.handleError<IUser>(`user`))
    );
  }
}
