import { Component, inject } from '@angular/core';
import { ISigninForm, ISigninResponse } from '../../core/interfaces/Models';
import { UsersService } from '../../core/services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  _UsersService = inject(UsersService);
  _ToastrService = inject(ToastrService);
  _Router = inject(Router);
  _FormBuilder = inject(FormBuilder);

  SignInFormGroup:FormGroup = this._FormBuilder.nonNullable.group({
    email: [null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)]],
  })

  onSigninSubmit():void{
    if(!this.SignInFormGroup.invalid){
      let loggingUser: ISigninForm = {
        email: this.SignInFormGroup.get('email')?.value,
        password: this.SignInFormGroup.get('password')?.value
      }
  
  this._UsersService.signin(loggingUser).subscribe({
    next: (res:ISigninResponse)=>{
      if(res.message === 'success'){
        localStorage.setItem('token',res.token);
        this._Router.navigate(['home']);
      }
    },
    error:(res)=>{
      this._ToastrService.error("Ivalid Login")
      console.log(res.error.error)
    }
  })
    }
    else{
      console.log("NOT VALID")
    }
    
  }
}
