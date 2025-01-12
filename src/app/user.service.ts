import { Injectable } from '@angular/core';
import { IUser } from './Models/User';
import { catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'http://localhost:5240/user/'
  constructor(private httpclient: HttpClient) { }

    // users
    addUser(user: IUser): Observable<Object>{
      const Url = this.baseUrl+'add'
      return this.httpclient.post(Url, user).pipe(catchError(e=>{
        throw e;
    }));
    }

    loginUser(user: IUser): Observable<Object>{
      const Url = this.baseUrl+'login';
      return this.httpclient.post(Url, user).pipe(catchError(e =>{
        throw e;
      }))
    }
}
