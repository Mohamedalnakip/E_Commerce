import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/authentaction/auth.service';
import { jwtDecode } from "jwt-decode";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


      responseText!:string
      loading:boolean=false
      private readonly _AuthService=inject(AuthService)
      private readonly _Router=inject(Router)
      private readonly _ToastrService=inject(ToastrService) 
  
  
    loginForm:FormGroup=new FormGroup({
  
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
    })
  
    login():void{
  
      if(this.loginForm.valid){
  
        console.log(this.loginForm.value);
        this.loading=true
        this._AuthService.signIn(this.loginForm.value).subscribe({
          next:(res)=>{
              console.log(res);
              this.loading=false
              sessionStorage.setItem('token',res.token)
              this._AuthService.decodeToken()
              this._Router.navigate(['/home'])
              this._ToastrService.success('',`Welcome ${res.user.name}`, 
              {

                closeButton:true,
                timeOut:1500
    
              })

          },
          error:(err)=>{
            console.log(err.error.message);
            this.responseText=err.error.message
            this.loading=false
  
          }
        })
      }
      else{
        this.loginForm.markAllAsTouched()
        this.loginForm.setErrors({missMatch:true})
      }
      
    }

}
