import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IUser } from '../Models/User';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user: IUser = {
    id:0,
    address:'',
    contact:'',
    email:'',
    name:'',
    password:'',
    products:[]
  }
  constructor(private userService: UserService, private router: Router){

  }
  addUser(from: NgForm){
    this.userService.addUser(this.user).subscribe({
      next: data =>{
        console.log(data);
        this.router.navigateByUrl('/login');
      },
      error: err => console.log(err)
    })
  }
}
