import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ISignupForm, ISignupResponse } from '../../core/interfaces/Models';
import { UsersService } from '../../core/services/users/users.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  _UsersService = inject(UsersService);
  _FormBuilder = inject(FormBuilder);
  _ToastrService = inject(ToastrService);
  _Router = inject(Router);
  UserSubscribe!:Subscription;

  RegisterFormGroup:FormGroup = this._FormBuilder.group({
      name: [null,[Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      password:[null,[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)]],
      rePassword:[null,Validators.required],
      email: [null,[Validators.required,Validators.email]],
      dateOfBirth: [null,[Validators.required]],
      gender:[null,[Validators.required]]
  })

  onRegisterSubmit():void{
    let registerForm:ISignupForm ={
      name: this.RegisterFormGroup.get('name')?.value,
      password:this.RegisterFormGroup.get('password')?.value,
      rePassword:this.RegisterFormGroup.get('rePassword')?.value,
      email: this.RegisterFormGroup.get('email')?.value,
      dateOfBirth: this.RegisterFormGroup.get('dateOfBirth')?.value,
      gender: this.RegisterFormGroup.get('gender')?.value
    }
    this.UserSubscribe = this._UsersService.signup(registerForm).subscribe({
      next:(res:ISignupResponse)=>{
        this._ToastrService.success("Account created successfully")
        this._Router.navigate(['login'])
      }
    })
  }
}