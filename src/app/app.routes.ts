import { Routes } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductTableComponent } from './product-table/product-table.component';

export const routes: Routes = [
    {
        path:"", redirectTo:"/home", pathMatch:'full'
    },
    {
        path:"home", component:ProductFormComponent
    },
    {
        path:'products', component: ProductTableComponent
    },
    
];
