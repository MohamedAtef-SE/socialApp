import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import { ICreateCommentForm, IUpdateCommentForm } from '../../interfaces/Models';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private _HttpClient:HttpClient) { }
  
    createComment(data:ICreateCommentForm):Observable<any>{
       return this._HttpClient.post(`${environments.baseURL}/comments`,data)
    }
  
    updateComment(commentId:string,data:IUpdateCommentForm):Observable<any>{
      return this._HttpClient.put(`${environments.baseURL}/comments/${commentId}`,data)
   }
  
   deletePost(commentId:string):Observable<any>{
    return this._HttpClient.delete(`${environments.baseURL}/comments/${commentId}`)
  }
  
    getPostComments(postId:string):Observable<any>{
      return this._HttpClient.get(`${environments.baseURL}/posts/${postId}/comments?limit=10`);
    }
}
