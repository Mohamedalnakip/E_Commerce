import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product/product.service';
import { Iproduct } from '../../core/interfaces/product/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  productId!:string
  productDetails!:Iproduct 
  private readonly _ActivatedRoute= inject(ActivatedRoute)
  private readonly _CartService= inject(CartService)

  constructor(private _ProductService:ProductService){}

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({

      next:(param)=>{

          console.log(param.get('p_id'));
          this.productId=param.get('p_id') !
      }
    })

    this._ProductService.getSpecificProduct(this.productId).subscribe({

      next:(res)=>{
        this.productDetails=res.data
          console.log(res.data);
      },
      error:(err)=>{
        console.log(err);      
      }

    }) 
  }
  addToCart(){
    this._CartService.addProductToCart(this.productId).subscribe({
      next:(res)=>{
          console.log(res);
          
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }
}
