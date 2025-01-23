import { Component, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { IComment, IGetPostCommentsResponse } from '../../../core/interfaces/Models';
import { DatePipe } from '@angular/common';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [DatePipe,InfiniteScrollDirective],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  
  @Input() PostId:string =  "";

  _CommentsService = inject(CommentsService);
  LoadingDataInProgress:WritableSignal<boolean> = signal(false);

  end:WritableSignal<number> = signal(10);

  Comments:WritableSignal<IComment[]> = signal([]);
  

  ngOnInit(): void {
    this._CommentsService.getPostComments(this.PostId).subscribe({
      next:(res:IGetPostCommentsResponse)=>{
        if(res.message === 'success'){
          this.Comments.set(res.comments);
          console.log(res.comments);
        }
      }
    })
  }

  onScroll():void{
    this.LoadingDataInProgress.set(true);
    console.log('comment scrolling')
    this.end.update(prev => prev + 10)
    setTimeout(()=> this.LoadingDataInProgress.set(false),1000)
  }

}
