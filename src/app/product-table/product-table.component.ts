import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { BehaviorSubject, catchError, combineLatest, EMPTY, map, Observable } from 'rxjs';
import { IProduct } from '../Models/Product';
import { CommonModule } from '@angular/common';
import { ICategory } from '../Models/Category';
import { CategoryService } from '../category.service';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTableComponent{
  errorMessage: string = '';
  private productService: ProductService = inject(ProductService);
  private categoryService: CategoryService = inject(CategoryService)
  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction = this.categorySelectedSubject.asObservable();
  category$:Observable<ICategory[]> = this.categoryService.categories$.pipe(catchError(e =>{
    console.log(this.errorMessage);
    return EMPTY;
  }))

  filteredProducts$: Observable<IProduct[]> = combineLatest([this.productService.productWithCategory$, this. categorySelectedAction]).pipe(
    map(data=> data[0].filter(e=> data[1] === 0 ? true : e.categoryId == data[1])),
    catchError(err => {
      this.errorMessage=err;
      return EMPTY;
    })
  );

  delete(id: number){
    console.log("deleting "+id)
    this.productService.deleteProduct(id).subscribe({
      next: data=> console.log(data),
      error: err=> console.log(err),
  });
  }
  onSelectedCatId(id: string){
    this.categorySelectedSubject.next(+id);
  }
  addProduct(){
    this.errorMessage="Kaam khatam";
    // this.productService.addProduct();
  }
}
