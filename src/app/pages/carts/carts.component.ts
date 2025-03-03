import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../core/interfeces/cart/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carts',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.scss'
})
export class CartsComponent implements OnInit{

  private readonly _CartService=inject(CartService)
  cartData!:ICart

  ngOnInit(): void {
      this._CartService.getLoggedUserCart().subscribe({
        next:(res)=>{

            console.log(res.data);
            this.cartData=res.data
            
        },
        error:(err)=>{

        }
      })
  }

  deleteItemFromCart(p_id:string){
    this._CartService.removeSpecificCartItem(p_id).subscribe({
      next:(res)=>{
        console.log(res.data);
        this._CartService.cartCount.next(res.numOfCartItems)
        this.cartData=res.data

      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  updateCount(p_id:string,count:number){
      if (count>1) {
        this._CartService.updateCartProductQuantity(p_id,count).subscribe({
          next:(res)=>{
            console.log(res.data);
            this.cartData=res.data  
          },
          error:(err)=>{
            console.log(err);         
          }
        })
      }
  }

  deleteAllCart(){
    this._CartService.clearCart().subscribe({
      next:(res)=>{
          console.log(res.data);
          this.cartData=res.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
