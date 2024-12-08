import { HttpClient } from '@angular/common/http';
import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { IProduct } from './Models/Product';
import { catchError, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnChanges{
  baseUrl : string ='http://localhost:5240/products/';
  constructor(private httpclient: HttpClient) { }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
  // products
  addProducts(data: IProduct): Observable<Object>{
    const Url = this.baseUrl+"add";
    console.log("sending product!")
    return this.httpclient.post(Url,data).pipe(catchError(e => {
      console.log(e);
      throw e;
    }));
  }
  getProducts(): Observable<IProduct[]>{
    const Url = this.baseUrl+"get-all"
    return this.httpclient.get<IProduct[]>(Url).pipe(catchError(e => {
      console.log(e.message);
      return throwError(()=>e.message)
    }));
  }
  deleteProduct(id: number): Observable<Object>{
    const Url = this.baseUrl+"delete/"+id;
    return this.httpclient.delete(Url).pipe(catchError(err=>{
      console.log(err);
      throw err;
    }));
  }
}
