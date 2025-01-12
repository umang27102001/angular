import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { IProduct } from './Models/Product';
import { BehaviorSubject, catchError, combineLatest, concatMap, EMPTY, filter, map, merge, Observable, of, scan, Subject, tap, throwError } from 'rxjs';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  baseUrl : string ='http://localhost:5240/products/';
  private httpclient: HttpClient = inject(HttpClient);
  private categoryService: CategoryService = inject(CategoryService);
  editProductAction = new BehaviorSubject<boolean>(false);
  editProduct: boolean = false;
  editProductObservable$ = this.editProductAction.asObservable().pipe(tap(e => this.editProduct = e));
  private productSelectChanged = new BehaviorSubject<number>(1);
  productChangedObservable = this.productSelectChanged.asObservable();

  private addProductSubject = new Subject<IProduct>();
  addProductObservable = this.addProductSubject.asObservable();

  private deleteProductclicked = new BehaviorSubject<number>(-1);
  deleteProductAction$ = this.deleteProductclicked.asObservable();

  products$ = this.httpclient.get<IProduct[]>(this.baseUrl+'get-all').pipe(catchError(e => {
    console.log("Product",e.message);
    return throwError(()=>e.message)
  }));

  productWithCategory$: Observable<IProduct[]> = combineLatest([this.products$, this.categoryService.categories$, this.deleteProductAction$]).pipe(
    map(([product, category, deleteId]) => {
      console.log("productWithCategory",product);
      return product.map(pd =>({...pd, categoryName: category.find(cat => cat.id == pd.categoryId)?.name} as IProduct)).filter(product=>product.id!=deleteId)
    })
  );


  selectedProduct$ = combineLatest([this.productWithCategory$, this.productChangedObservable]).pipe(
    map(([products, productId])=>products.find(e=>e.id == productId)))

  productsAddedNew$ = merge(this.productWithCategory$, this.addProductObservable.pipe(
    concatMap(prod => this.httpclient.post(this.baseUrl+'add', prod))
  )).pipe(
    scan((acc, value)=>{
      return (value instanceof Array)?[...value]:[...acc, value];
    }, [] as IProduct[])
  )
  // products
  addProducts(data: IProduct): Observable<Object>{
    const Url = this.baseUrl+"add";
    console.log("sending product!")
    return this.httpclient.post(Url,data).pipe(catchError(e => {
      throw e;
    }));
  }

  deleteProduct(id: number): Observable<Object>{
    const Url = this.baseUrl+"delete/"+id;
    let result = this.httpclient.delete(Url).pipe(
      tap(data=>this.deleteProductclicked.next(id)),
      tap(data=> this.products$ = this.productWithCategory$), catchError(err=>{
      throw err;
    }));
    return result;
  }

  updateProduct(product: IProduct): Observable<Object>{
    const Url = this.baseUrl+'update';
    return this.httpclient.put(Url, product);
  }

  getAllProducts(): Observable<IProduct[]>{
    const Url = this.baseUrl+'get-all';
    return this.httpclient.get<IProduct[]>(Url);
  }
  productChanged(productId: number){
    this.productSelectChanged.next(productId);
  }

  addProduct(){
    let dummy = {
      categoryId:1,
      categoryName:'Electronic',
      discount:12,
      id:40,
      imageUrl:'https://fsdf.com',
      description:'boston',
      name:'Zepto',
      price:122
    } as IProduct;
    this.addProductSubject.next(dummy);
  }
  toggleEditForm(value: boolean = false): void{
    if(value){
      this.editProductAction.next(false);
    }
    else this.editProductAction.next(!this.editProduct);
  }

}
