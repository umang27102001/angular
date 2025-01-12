import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { map, mergeMap, Observable, tap } from 'rxjs';
import { IProduct } from '../Models/Product';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getProduct, State } from '../product-list/state/product.list.reducer';
import * as AppAction from '../product-list/state/product.list.action';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  private productService: ProductService = inject(ProductService);
  private categoryService: CategoryService = inject(CategoryService);
  private store: Store<State> = inject(Store<State>);
  product: IProduct | null = null;
  categories$ = this.categoryService.categories$;
  editProduct$ = this.productService.editProductObservable$;
  ngOnInit(): void {
    this.store.select(getProduct).pipe(tap(e=>console.log("Hellooooo"))).subscribe(data=> this.product = {...data!});
  }
  editClick(): void{
    this.productService.toggleEditForm();
  }
  addToCart(){

  }
  deleteProduct(){
    this.productService.deleteProduct(this.product?.id ?? 0).subscribe(data=>console.log(data));
    this.store.dispatch(AppAction.clearCurrentProduct());
  }
  saveProduct(){
    if(this.product?.id === 0 ){
      this.productService.addProducts(this.product!).pipe(
        mergeMap(e => this.productService.getAllProducts()),
        tap(e=> this.store.dispatch(AppAction.injectAllProducts({products: [...e]})))
      ).subscribe(e=>console.log(e));
    }
    else this.productService.updateProduct(this.product!).subscribe(e=>console.log(e));
    this.store.dispatch(AppAction.setCurrentProduct({product: this.product!}));
  }
}
