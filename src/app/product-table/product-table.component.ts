import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { catchError, combineLatest, EMPTY, forkJoin, map, Observable, of } from 'rxjs';
import { IProduct } from '../Models/Product';
import { CommonModule } from '@angular/common';
import { ICategory } from '../Models/Category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTableComponent implements OnInit{
  errorMessage: string = '';
  constructor(private productService: ProductService, private categoryService: CategoryService){

  }
  product$: Observable<IProduct[]>  | undefined
  category$:Observable<ICategory[]> |undefined
  productWithCat$: Observable<IProduct[]> | undefined;
  ngOnInit(): void{
    this.product$=this.productService.getProducts().pipe(catchError(e =>{
      this.errorMessage = e;
      console.log(this.errorMessage);
      return EMPTY;
    }));
    this.category$ = this.categoryService.getCategories().pipe(catchError(e =>{
      console.log(this.errorMessage);
      return EMPTY;
    }))
    this.productWithCat$ = combineLatest([this.product$, this.category$]).pipe(
      map(([product, category]) => product.map(pd =>({...pd, categoryName: category.find(cat => cat.id == pd.categoryId)?.name} as IProduct)))
    )
  }
  delete(id: number){
    console.log("deleting "+id)
    this.productService.deleteProduct(id).subscribe({
      next: data=> console.log(data),
      error: err=> console.log(err),
  });
  }
}
