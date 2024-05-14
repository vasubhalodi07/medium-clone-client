import { Component, OnInit } from '@angular/core';
import { BlogApiService } from '../../../../core/services/blog-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LikeApiService } from '../../../../core/services/like-api.service';
import { FollowApiService } from '../../../../core/services/follow-api.service';
import { LOCATION_INITIALIZED } from '@angular/common';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css',
})
export class BlogDetailsComponent implements OnInit {
  blog: any;
  user_id: any;

  showModal: boolean = false;
  blogId: any;

  likesCount: any;
  isLiked: boolean = false;

  loadingBlogDetails: boolean = false;

  showConfirmation: boolean = false;
  blogDeleteLoading: boolean = false;

  followers: any;
  isFollowing: boolean = false;

  loginShowModel: boolean = false;
  token: any;
  userId: any;

  constructor(
    private blogApiService: BlogApiService,
    private activatedRoute: ActivatedRoute,
    private likeApiService: LikeApiService,
    private followApiService: FollowApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.token = token;

    this.user_id = localStorage.getItem('id');
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.blogId = id;
    this.fetchBlogById(id);
  }

  fetchBlogById(id: any) {
    this.loadingBlogDetails = true;
    this.blogApiService.fetchBlogById(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.userId = data.data.user_id;

        this.loadingBlogDetails = false;
        this.blog = data.data;
        this.likesCount = data.count;
        this.isLiked = this.blog.likes.some(
          (like: any) => like.user_id == this.user_id
        );
        this.followers = data.followers;
        this.checkFollowingStatus();
      },
      error: (error) => {
        this.loadingBlogDetails = false;
        console.log(error);
      },
    });
  }

  deleteModalActive(id: any) {
    this.blogId = id;
    this.showConfirmation = true;
  }

  toggleModal() {
    if (!localStorage.getItem('token')) {
      this.loginShowModel = true;
      return;
    }

    this.showModal = !this.showModal;
  }

  confirmDelete() {
    console.log('delete confirmation called');
    this.blogDeleteLoading = true;
    this.blogApiService.deleteBlog(this.blogId).subscribe({
      next: (data: any) => {
        this.blogDeleteLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.blogDeleteLoading = false;
        console.log(err);
      },
    });
  }

  updateNavigation(id: any) {
    this.router.navigate(['/blog/update/' + id]);
  }

  cancelDelete() {
    this.showConfirmation = false;
  }

  likeFun() {
    if (!localStorage.getItem('token')) {
      this.loginShowModel = true;
      return;
    }

    if (this.isLiked) {
      this.likeApiService.removeLike(this.blogId).subscribe({
        next: (data) => {
          console.log(data);
          this.isLiked = false;
          this.likesCount--;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.likeApiService.addLike(this.blogId).subscribe({
        next: (data) => {
          console.log(data);
          this.isLiked = true;
          this.likesCount++;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  checkFollowingStatus() {
    const currentUserID = localStorage.getItem('id');
    if (!currentUserID) return;

    console.log(this.followers);

    this.followers.forEach((follower: any) => {
      console.log(follower);
      if (follower.follower_id == parseInt(currentUserID)) {
        this.isFollowing = true;
        return;
      }
    });
  }

  toggleFollow() {
    const currentUserID = localStorage.getItem('id');
    if (!currentUserID) return;

    if (this.isFollowing) {
      this.followApiService.unfollowUser(this.blog.user_id).subscribe({
        next: (data) => {
          console.log(data);
          this.isFollowing = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.followApiService.followUser(this.blog.user_id).subscribe({
        next: (data) => {
          console.log(data);
          this.isFollowing = true;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  followUser() {
    this.followApiService.followUser(this.blog.user_id).subscribe({
      next: () => {
        this.isFollowing = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  closeModel() {
    this.loginShowModel = false;
  }

  navigateToProfile() {
    this.router.navigate([`/user/${this.userId}`]);
  }
}
