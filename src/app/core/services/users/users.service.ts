import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import {  IChangePasswordForm, ISigninForm, ISignupForm, IUploadPhotoForm } from '../../interfaces/Models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient: HttpClient) { }

  signup(data:ISignupForm):Observable<any>{
    return this._HttpClient.post(`${environments.baseURL}/users/signup`,data)
  }

  signin(data:ISigninForm):Observable<any>{
    return this._HttpClient.post(`${environments.baseURL}/users/signin`,data)
  }

  changePassword(data:IChangePasswordForm): Observable<any>{
    return this._HttpClient.patch(`${environments.baseURL}/users/change-password`,data)
  }

  uploadProfilePhoto(data:IUploadPhotoForm):Observable<any>{
    return this._HttpClient.put(`${environments.baseURL}/users/upload-photo`,data)
  }

  getLoggedUserData():Observable<any>{
    return this._HttpClient.get(`${environments.baseURL}/users/profile-data`)
  }

}