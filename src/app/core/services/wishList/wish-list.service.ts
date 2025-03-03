import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  userToken: any

  constructor(private _HttpClient: HttpClient, @Inject(PLATFORM_ID) private _PLATFORM_ID: any) {

  }


  addProductToWishlist(p_id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,{"productId": p_id} )
  }

  GetLoggedUserWishlist(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
  }

  RemoveProductFromWishlist(p_id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${p_id}`)
  }


}
