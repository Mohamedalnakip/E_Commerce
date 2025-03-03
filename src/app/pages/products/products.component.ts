import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../core/services/product/product.service';
import { Iproduct } from '../../core/interfaces/product/iproduct';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-products',
  imports: [SearchPipe,FormsModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  private readonly _ProductService=inject(ProductService)
  private readonly _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)
  private readonly _WishListService=inject(WishListService)

  productContent!:Iproduct[]
  searchValue:string=''
  

  ngOnInit(): void {
    this._ProductService.getAllProduct().subscribe({
      next:(res)=>{
        console.log(res);
        this.productContent=res.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  

  addToCart(p_id:string){
    this._CartService.addProductToCart(p_id).subscribe({
      next:(res)=>{
          console.log(res.numOfCartItems);
          this._CartService.cartCount.next(res.numOfCartItems)
          console.log(this._CartService.cartCount);
          
          this._ToastrService.success(res.message,'FreshCart',
          {
            closeButton:true,
            timeOut:1500,
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

  addToWishList(p_id:string){
    this._WishListService.addProductToWishlist(p_id).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success(res.message,'FreshCart',
          {
            closeButton:true,
            timeOut:1500,
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
