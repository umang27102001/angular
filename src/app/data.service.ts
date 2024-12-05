import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './data/Product';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  Url : string ='';
  constructor(private httpclient: HttpClient) { }

  postFormData(data: IProduct): Observable<any>{
    return of(1,2,3)
  }
  getProducts(): Observable<IProduct[]>{
    // return this.httpclient.get<IProduct[]>(this.Url).pipe(
    //   tap(e => console.log("data received ", e)),
    // )
    return of([{
      id: 0,
    name: "string",
    price: 0,
    description:"string",
    category:"string",
    imageUrl:"string",
    discount: 9
    }]);
  }
}
