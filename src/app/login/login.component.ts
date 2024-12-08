import { CommonModule, NgFor } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IUser } from '../Models/User';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{
  user: IUser ={
    id:0,
    address:'',
    contact:'',
    email:'',
    name:'',
    password:'',
    products:[]
  }
  sub: Subscription | undefined;
  constructor(private userService: UserService){
    
  }
  loginUser(form: NgForm){
    this.sub = this.userService.loginUser(this.user).subscribe({
      next: data => console.log(data),
      error: err=> console.log(err)
    })
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
