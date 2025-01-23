import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import { ICreateUpdatePostForm, IFilter } from '../../interfaces/Models';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private _HttpClient:HttpClient) { }

  createPost(data:ICreateUpdatePostForm):Observable<any>{
     return this._HttpClient.post(`${environments.baseURL}/posts`,data)
  }

  updatePost(postId:string,data:ICreateUpdatePostForm):Observable<any>{
    return this._HttpClient.put(`${environments.baseURL}/posts/${postId}`,data)
 }

 deletePost(postId:string):Observable<any>{
  return this._HttpClient.delete(`${environments.baseURL}/posts/${postId}`)
}

  getAllPosts(filter: IFilter):Observable<any>{
    return this._HttpClient.get(`${environments.baseURL}/posts?limit=${filter.limit}&page=${filter.page}`)
  }

  getUserPosts(userId:string,filter:IFilter):Observable<any>{
    return this._HttpClient.get(`${environments.baseURL}/users/${userId}/posts?limit=${filter.limit}`);
  }

  getSinglePost(postId:string):Observable<any>{
    return this._HttpClient.get(`${environments.baseURL}/posts/${postId}`);
  }
}
