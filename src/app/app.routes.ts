import { Routes } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';

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
    {
        path:'signup', component: SignupComponent
    },
    {
        path:'login', component: LoginComponent
    },
    {
        path:'product-list', component: ProductListComponent
    }
];
