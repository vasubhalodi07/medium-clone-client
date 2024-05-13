import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentApiService } from '../../../../core/services/comment-api.service';
import { UserApiService } from '../../../../core/services/user-api.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  message: string = '';
  listMessage: any[] = [];
  editId: any = null;

  user_id: any;
  profile: any;

  loadingComment: boolean = false;

  @Input() blogId: any;
  @Input() showModal: boolean | undefined;
  @Output() toggleModal = new EventEmitter<void>();

  isEditing: boolean = false;

  constructor(
    private commentApiService: CommentApiService,
    private userApiService: UserApiService
  ) {}

  ngOnInit(): void {
    let id = localStorage.getItem('id');
    this.user_id = id;
    this.fetchCommentByBlogId(this.blogId);
    this.fetchUserById(id);
  }

  fetchCommentByBlogId(blogId: string) {
    this.loadingComment = true;
    this.commentApiService.fetchComment(blogId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.loadingComment = false;
        this.listMessage = data.data;
      },
      error: (err) => {
        this.loadingComment = false;
        console.log(err);
      },
    });
  }

  fetchUserById(id: any) {
    this.userApiService.fetchUserById(id).subscribe({
      next: (data: any) => {
        this.profile = data.data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  resetData() {
    this.message = '';
  }

  addComment() {
    const data = {
      message: this.message,
      blog_id: this.blogId,
    };

    this.commentApiService.addComment(data).subscribe({
      next: (data: any) => {
        console.log(data);
        this.fetchCommentByBlogId(this.blogId);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.resetData();
  }

  closeModal() {
    this.toggleModal.emit();
  }

  deleteComment(id: any) {
    this.commentApiService.deleteComment(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.fetchCommentByBlogId(this.blogId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleEdit(id: any) {
    if (this.editId === id) {
      this.editId = null;
    } else {
      this.editId = id;
    }
    this.isEditing = true;
  }

  updateComment(comment: any) {
    this.commentApiService
      .updateComment(comment.id, comment.message)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    this.editId = null;
    this.isEditing = false;
  }
}
