import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/authentaction/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {


        private readonly _AuthService=inject(AuthService)
        private readonly _Router=inject(Router)
        private readonly _ToastrService=inject(ToastrService)
        
  resetPass:FormGroup=new FormGroup({
  
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
  })

  reset():void{

    if(this.resetPass.valid){

      console.log(this.resetPass.value);
        this._AuthService.resetPassword(this.resetPass.value).subscribe({
        next:(res)=>{
            console.log(res);
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

        }
      })
    }
  
    
  }

}
