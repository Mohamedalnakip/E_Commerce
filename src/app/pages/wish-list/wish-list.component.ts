import { CartService } from './../../core/services/cart/cart.service';
import { IWishList } from '../../core/interfaces/wishList/iwish-list';
import { ICart } from '../../core/interfeces/cart/icart';
import { WishListService } from './../../core/services/wishList/wish-list.service';
import { Component, inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{

  private readonly _WishListService=inject(WishListService)
  private readonly _CartServices=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)
  wishListData!:IWishList


  ngOnInit(): void {
      this._WishListService.GetLoggedUserWishlist().subscribe({
        next:(res)=>{
          console.log(res);
          this.wishListData=res
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
  }

  addToCart(p_id:string){
    this._CartServices.addProductToCart(p_id).subscribe({
      next:(res)=>{
          console.log(res);
          this._ToastrService.success(res.message,'FreshCart',
            {
              closeButton:true,
              timeOut:1500,
              progressBar:true,
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

  removeFromWishList(p_id:string){
    this._WishListService.RemoveProductFromWishlist(p_id).subscribe({
      next:(res)=>{
          console.log(res);
          this.wishListData=res
      },
      error:(err)=>{
          console.log(err);
      }
      
    })
  }

  

}
