import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(){}

private readonly _HttpClient=inject(HttpClient)

getAllProduct():Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`)

}

getSpecificProduct(id:string):Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)

}




}
