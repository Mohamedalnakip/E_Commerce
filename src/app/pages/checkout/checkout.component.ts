import { PaymentService } from './../../core/services/payment/payment.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{


  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _PaymentService=inject(PaymentService)
  private readonly _ToastrService=inject(ToastrService)

  cartId!:string

  detailsForm:FormGroup=new FormGroup({

    details:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,Validators.pattern(/^01[0125][0-9]{8}$/)),
    city:new FormControl(null,[Validators.required]),

  })


  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(param)=> {
          this.cartId= param.get('c_id')!
            
        },
      })
  }

  detailsSubmit(){
    console.log(this.detailsForm.value);

    if (this.detailsForm.valid) {
      this._PaymentService.checkOutSession(this.cartId,this.detailsForm.value).subscribe({
        next:(res)=>{
            console.log(res);

            if(res.status=='success'){
              window.open(res.session.url,'_self')
            }
        },
        error:(err)=>{
            console.log(err);
        }

      })
    }
    
  }

  completeCashOrder(){
    this._PaymentService.cashOrder(this.cartId,this.detailsForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success(res.message,'FreshCart',
          {
            closeButton:true,
            timeOut:1500,
            // progressBar:true,
            progressAnimation:'decreasing',
            toastClass:'myToaster',
            positionClass:'myToaster-position'
          })
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
