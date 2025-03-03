import { AuthService } from './../../core/services/authentaction/auth.service';
import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

    responseText!:string
    loading:boolean=false
    private readonly _AuthService=inject(AuthService)
    private readonly _Router=inject(Router)


  registerForm:FormGroup=new FormGroup({

    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
    rePassword:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,Validators.pattern(/^01[0125][0-9]{8}$/)),
  },this.compare)

  compare(fGroup:AbstractControl){


    return fGroup.get('password')?.value === fGroup.get('rePassword')?.value ? null:{missMatch:true}

    // if ( fGroup.get('password')?.value === fGroup.get('rePassword')?.value) {
    //   return null
    // }
    // else{
    //   return {missMatch:true}
    // }
  }



  showForm():void{

    if(this.registerForm.valid){

      console.log(this.registerForm.value);
      this.loading=true
      this._AuthService.signup(this.registerForm.value).subscribe({
        next:(res)=>{
            console.log(res);
            this.loading=false
            this._Router.navigate(['/Login'])
        },
        error:(err)=>{
          console.log(err.error.message);
          this.responseText=err.error.message
          this.loading=false

        }
      })
    }
    else{
      this.registerForm.markAllAsTouched()
      this.registerForm.setErrors({missMatch:true})
    }
    
  }
}
