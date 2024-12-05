import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IProduct } from '../data/Product';
import { DataService } from '../data.service';
import { catchError, EMPTY, map, Observable, of, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit, OnChanges{
  originalProduct: IProduct = {
    id:0,
    name:'',
    category:'',
    description:'',
    price:0,
    imageUrl:'',
    discount: 0
  } 
  @Input() temp: string = '';
  @Input() test = {name:'umang'}
  products$!: Observable<IProduct[]>
  product : IProduct = {... this.originalProduct}
  sub!: Subscription;
  errMessage: string = '';
  constructor(private dataService: DataService){

  }
  ngOnChanges(){
    console.log("Hi")
  }
  ngOnInit(): void {
    let a=[1,2,3,4,5]
    this.products$ = this.dataService.getProducts();
    console.log(this.products$);
    of(...a).pipe(
      map(e=>{
        if(e==9){
          throw '3';
        }
        return e*2;
      }),
      tap(e=>console.log(e)),
      catchError(err=>EMPTY)
    );
   
    console.log(a)
  }
  submit(form: NgForm){
    console.log(form)
    this.test = {...this.test, name:"oppo"}
  }
}
