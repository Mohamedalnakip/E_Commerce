import { PaymentService } from './../../core/services/payment/payment.service';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from './../../core/services/authentaction/auth.service';
import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { IAllorder } from '../../core/interfeces/allorder/iallorder';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{

  private readonly _AuthService=inject(AuthService)
  private readonly _PaymentService=inject(PaymentService)
  


  
  userInfo!:any
  userId!:string
  allOrders:IAllorder[]=[]

  ngOnInit(): void {
        this.userInfo= jwtDecode(sessionStorage.getItem('token')!)
        this.userId=this.userInfo.id
        console.log( this.userId);

        this._PaymentService.getUserOrder(this.userId).subscribe({
          next:(res)=>{
            console.log(res);
            this.allOrders=res
            
          },
          error:(err)=>{
            console.log(err);
            
          }
        })


        

    
  }


}
