import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/authentaction/auth.service';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  private readonly _AuthService=inject(AuthService)
  private readonly _Router=inject(Router)

  Verify:FormGroup=new FormGroup({
    
        email:new FormControl(null,[Validators.required,Validators.email]),
      })


      VerifyEmail():void{
  
        if(this.Verify.valid){
    
          console.log(this.Verify.value);
          this._AuthService.forgotPassword(this.Verify.value).subscribe({
            next:(res)=>{
                console.log(res);              
                this._Router.navigate(['/verify-code'])
              
  
            },
            error:(err)=>{
              console.log(err.error.message);
    
            }
          })
        }
        
      }


}
