import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { IProduct } from '../data/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent implements OnInit{

  constructor(private dataService: DataService){

  }
  product$: Observable<IProduct[]> | undefined
  ngOnInit(): void{
    this.product$=this.dataService.getProducts();
  }
  delete(id: number){
    console.log("deleting "+id)
    this.dataService.deleteProduct(id).subscribe({
      next: data=> console.log(data),
      error: err=> console.log(err),
  });
  }
}
