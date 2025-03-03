import { Component, inject, OnInit, OnDestroy, InputSignal, input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/authentaction/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit ,OnDestroy{

  check:InputSignal<boolean>=input(false)

  private readonly _Router=inject(Router)
  private readonly _AuthService=inject(AuthService)
  private readonly _CartService=inject(CartService)

  navCartCount!:number
  cancel!:Subscription
  ngOnInit(): void {

    this._CartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.numOfCartItems);
        this.navCartCount=res.numOfCartItems
        
      }
    })

  this.cancel= this._CartService.cartCount.subscribe({
      next:(value)=>{
          console.log(value);
          this.navCartCount=value
      }
    })
  }

  ngOnDestroy(): void {
    this.cancel?.unsubscribe()
  }


  logOut(){
    sessionStorage.removeItem('token')
    this._Router.navigate(['/login'])
    this._AuthService.userInfo=null

  }
}
