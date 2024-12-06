import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IProduct } from '../data/Product';
import { DataService } from '../data.service';
import { catchError, EMPTY, map, Observable, of, Subscription, tap } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit{
  originalProduct: IProduct = {
    id:11,
    name:'Boult headset',
    category:'Headphones',
    description:'Great bluetooth',
    price:123,
    imageUrl:'http://bluetooh-headset.fav',
    discount: 123
  } 
  @Input() temp: string = '';
  @Input() test = {name:'umang'}
  products$!: Observable<IProduct[]>
  product : IProduct = {... this.originalProduct}
  errMessage: string = '';
  constructor(private dataService: DataService){

  }
  ngOnInit(): void {
    this.products$ = this.dataService.getProducts();
  }
  submit(form: NgForm){
    console.log(this.product);
    this.dataService.postFormData(this.product).subscribe({
      next: data=>console.log(data), 
      error: err=>console.log(err)
    });
  }
}
