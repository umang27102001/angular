import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICategory } from './Models/Category';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl : string = 'http://localhost:5240/category/'
  private httpClient: HttpClient = inject(HttpClient)
  categories$ = this.httpClient.get<ICategory[]>(this.baseUrl+'get-all').pipe(
    tap(data=> console.log("Category")),
    catchError(err =>{
      return throwError(()=>err.message);
    })
  )
  addCategory(category: ICategory): Observable<Object>{
    return this.httpClient.post(this.baseUrl+'add', category).pipe(
      catchError(err =>{
        return throwError(()=>err.message);
      })
    )
  }
}
