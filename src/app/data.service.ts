import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './data/Product';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl : string ='http://localhost:5240/';
  constructor(private httpclient: HttpClient) { }

  postFormData(data: IProduct): Observable<Object>{
    const Url = this.baseUrl+"set-product";
    console.log("sending product!")
    return this.httpclient.post(Url,data).pipe(catchError(e => {
      console.log(e);
      throw e;
    }));
  }
  getProducts(): Observable<IProduct[]>{
    const Url = this.baseUrl+"get-products"
    return this.httpclient.get<IProduct[]>(Url).pipe(catchError(e => {
      console.log(e);
      throw e;
    }));
  }
  deleteProduct(id: number): Observable<Object>{
    const Url = this.baseUrl+"delete-product/"+id;
    return this.httpclient.delete(Url).pipe(catchError(err=>{
      console.log(err);
      throw err;
    }));
  }
}
