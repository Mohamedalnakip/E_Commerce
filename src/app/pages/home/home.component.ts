import { CategoryService } from './../../core/services/categorys/category.service';
import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, viewChildren } from '@angular/core';
import { ProductService } from '../../core/services/product/product.service';
import { Iproduct } from '../../core/interfaces/product/iproduct';
import { Subscription } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ICategory } from '../../core/interfaces/category/icategory';
import {FormsModule}from '@angular/forms'
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  imports: [CarouselModule,SearchPipe,FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit ,OnDestroy{

  searchValue:string=''
  categoryData!:ICategory[]
  productsData!:Iproduct[]
  productSub!:Subscription
  categorySub!:Subscription
  items: any;

  // @ViewChildren('heart') myElement!:QueryList<ElementRef>



  constructor(private _productService :ProductService,private CategoryService_:CategoryService,private _CartService:CartService,private _ToastrService: ToastrService,private _WishListService:WishListService){
    
  }

  ngOnInit(): void {

    this.categorySub=  this.CategoryService_.GetAllCategories().subscribe({

      next:(res)=>{

        console.log(res.data);
        this.categoryData=res.data
        
      },
      error:(err)=>{
          console.log(err);
      }
    })
  
    this.productSub=this._productService.getAllProduct().subscribe({

      next:(res)=>{

        this.productsData=res.data
          console.log(res.data);
          
      },
      error:(err)=>{
        console.log(err);
        
    },

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


  ngOnDestroy(): void {

    this.categorySub?.unsubscribe()
    this.productSub?.unsubscribe()
  }

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
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



  categorySliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1280:{
        items:6
      }
    },
    nav: false
  }

  addToWishList(p_id:string){
    this._WishListService.addProductToWishlist(p_id).subscribe({
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
        // this.myElement.forEach((ele)=>ele.nativeElement.classList.add('text-red-500'))
        // .classList.add('text-red-500')
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


}
