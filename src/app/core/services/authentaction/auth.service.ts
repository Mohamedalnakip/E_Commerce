import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo:any
  constructor(private _HttpClient:HttpClient) { }



  decodeToken():void{

    if( sessionStorage.getItem('token')){
      
        this.userInfo= jwtDecode(sessionStorage.getItem('token')!)
        }
  }

  signup(data:object):Observable<any>{

  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }

  signIn(data:object):Observable<any>{

    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
    }

  forgotPassword(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }

  verifyResetCode(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }

  resetPassword(data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
  }
}


