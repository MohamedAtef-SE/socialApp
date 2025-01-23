import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Subscription } from 'rxjs';
import { IAllUsersPostsResponse, IFilter } from '../../core/interfaces/Models';
import { PostsService } from '../../core/services/posts/posts.service';
import { CommentsComponent } from '../shared/comments/comments.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe,InfiniteScrollDirective,CommentsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  

  private readonly _PostsService = inject(PostsService);
  PostSubscribe!: Subscription
  LoadingDataInProgress:WritableSignal<boolean> = signal(false);
  UsersPosts: WritableSignal<IAllUsersPostsResponse> = signal({} as IAllUsersPostsResponse);
  
  ngOnInit(): void {
    let filter : IFilter ={
      limit: 4,
      page:1
    } 
    this.PostSubscribe = this._PostsService.getAllPosts(filter).subscribe({
      next:(res:IAllUsersPostsResponse)=>{
        this.UsersPosts.set(res);
      }});
  }

  onScroll() {
    console.log('loading...')
    this.LoadingDataInProgress.set(true)
    let filter : IFilter ={
      limit: 4,
      page:2
    } 
    this.PostSubscribe = this._PostsService.getAllPosts(filter).subscribe({
      next:(res:IAllUsersPostsResponse)=>{
        this.UsersPosts.update((prevPosts)=> {

          return {
            message: res.message,
            paginationInfo: res.paginationInfo,
            posts: [...prevPosts.posts,...res.posts]
          }
        });

       this.LoadingDataInProgress.set(false);
      }});
  }


  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  

}
