import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartCount:BehaviorSubject<number>=new BehaviorSubject(0)

  constructor(private _HttpClient:HttpClient,@Inject(PLATFORM_ID) private _PLATFORM_ID:any) {

  

    }

  getLoggedUserCart():Observable<any>{

    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`)
  }

  addProductToCart(p_id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,{"productId": p_id})
  }

  removeSpecificCartItem(p_id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${p_id}`)
  }
  clearCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }

  updateCartProductQuantity(p_id:string,count:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${p_id}`,{"count":count})
  }


}
