import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IProduct } from '../Models/Product';
import { ProductService } from '../product.service';
import { catchError, EMPTY, map, Observable, of} from 'rxjs';
import { ICategory } from '../Models/Category';
import { CategoryService } from '../category.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit{
  originalProduct: IProduct = {
    id:11,
    name:'Boult headset',
    categoryId: 0,
    categoryName:'',
    description:'Great bluetooth',
    price:123,
    imageUrl:'http://bluetooh-headset.fav',
    productCode:'223',
    discount: 123,
  }
  category$: Observable<ICategory[]> | undefined
  product : IProduct = {... this.originalProduct}
  errMessage: string = '';
  constructor(private categoryService: CategoryService, private productService: ProductService){

  }
  ngOnInit(): void {
    this.category$ = this.categoryService.categories$.pipe(
      catchError(error => EMPTY)
    );
  }
  submit(form: NgForm){
    console.log(this.product);
    this.productService.addProducts(this.product).subscribe({
      next: data=>console.log(data),
      error: err=>console.log(err)
    });
  }
}
