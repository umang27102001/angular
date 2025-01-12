import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { BehaviorSubject, catchError, combineLatest, EMPTY, map, Observable, Subject, tap } from 'rxjs';
import { IProduct } from '../Models/Product';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { provideState, Store } from '@ngrx/store';
import { allProducts, getShowProductCode, State } from './state/product.list.reducer';
import * as AppAction from './state/product.list.action'
import { ProductFormComponent } from '../product-form/product-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductDetailsComponent, FormsModule, ProductFormComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductListComponent implements OnInit{
  showProductCode: boolean = false;
  private productService: ProductService = inject(ProductService)
  private store: Store<State> = inject(Store<State>)
  selectedProductId: number = 1;
  errorMessage : Subject<string> = new Subject<string>();
  pageIndex=1;
  topProduct!: IProduct;
  private nextPageSubject = new BehaviorSubject<number>(1);
  nextPageObservable = this.nextPageSubject.asObservable();
  addProductFlag: boolean = false;
  isLastPage: boolean = false;
  products$!: Observable<IProduct[]> ;

  ngOnInit(): void {
    this.store.select(getShowProductCode).subscribe({
      next:
      data =>
        this.showProductCode = data,
    }
    );
    this.productService.products$.subscribe(
      {
        next: data=> {
          console.log("Injecting datsa");
          this.store.dispatch(AppAction.injectAllProducts({products: data}))},
        error: err => this.errorMessage.next(err)
      }
    )
    this.products$= combineLatest([this.store.select(allProducts), this.nextPageObservable]).pipe(
      tap(e=> console.log("Hi, I'm combine latest")),
      map(([products, index])=>{
        let result = [...products].sort((a: IProduct,b: IProduct)=>a.id - b.id).slice((index-1)*5, ((index-1)*5)+5);
        this.topProduct = result[0];
        this.store.dispatch(AppAction.setCurrentProduct({product:this.topProduct}));
        this.selectedProductId = this.topProduct?.id ?? 0;
        this.isLastPage = Math.ceil(products.length / 5) <= index;
        return result;
      }),
      catchError(err => {
        console.log(err)
        this.errorMessage.next(err)
        return EMPTY;
      })
    );
  }

  nextPage(){
    this.nextPageSubject.next(this.pageIndex+1);
    this.productService.toggleEditForm(true);
    this.store.dispatch(AppAction.setCurrentProduct({product:this.topProduct}));
    this.selectedProductId = this.topProduct?.id ?? 0;
    this.pageIndex++;
  }
  prevPage(){
    this.nextPageSubject.next(this.pageIndex-1);
    this.productService.toggleEditForm(true);
    this.store.dispatch(AppAction.setCurrentProduct({product:this.topProduct}));
    this.selectedProductId = this.topProduct?.id ?? 0;
    this.pageIndex--;
  }
  selectProduct(product: IProduct){
    this.productService.toggleEditForm(true);
    this.store.dispatch(AppAction.setCurrentProduct({product}))
    this.selectedProductId = product.id;
  }
  checkproductcode(){
    this.store.dispatch(AppAction.toogleProductCode())
  }

  addProduct(){
    this.store.dispatch(AppAction.initializeCurrentProduct())
  }
}
