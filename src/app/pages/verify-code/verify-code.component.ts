import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/authentaction/auth.service';
import { jwtDecode } from "jwt-decode";
@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent {



    private readonly _AuthService=inject(AuthService)
    private readonly _Router=inject(Router)
  
    codeReset:FormGroup=new FormGroup({
      
      resetCode:new FormControl(null,[Validators.required]),
        })
  
  
        resetCode():void{
    
          if(this.codeReset.valid){
      
            console.log(this.codeReset.value);
            this._AuthService.verifyResetCode(this.codeReset.value).subscribe({
              next:(res)=>{
                  console.log(res);
                  
                  this._Router.navigate(['reset-password'])
                
    
              },
              error:(err)=>{
                console.log(err.error.message);
      
              }
            })
          }
          
        }
  

}
