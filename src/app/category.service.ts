import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from './Models/Category';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl : string = 'http://localhost:5240/category/'
  constructor(private httpClient: HttpClient) { }

  addCategory(category: ICategory): Observable<Object>{
    return this.httpClient.post(this.baseUrl+'add', category).pipe(
      catchError(err =>{
        return throwError(()=>err.message);
      })
    )
  }

  getCategories(): Observable<ICategory[]>{
    return this.httpClient.get<ICategory[]>(this.baseUrl+'get-all').pipe(
      tap(data=> console.log(data)),
      catchError(err =>{
        return throwError(()=>err.message);
      })
    )
  }
}
