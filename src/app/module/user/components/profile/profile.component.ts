import { Component, OnInit } from '@angular/core';
import { FollowApiService } from '../../../../core/services/follow-api.service';
import { BlogApiService } from '../../../../core/services/blog-api.service';
import { ActivatedRoute } from '@angular/router';
import { UserApiService } from '../../../../core/services/user-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  followers: any;
  followersLoading: boolean = false;

  following: any;
  followingLoading: boolean = false;

  blogs: any;
  blogLoading: boolean = false;

  user: any;
  userLoading: boolean = false;

  activeSection: string = 'profile';

  constructor(
    private followApiService: FollowApiService,
    private blogApiService: BlogApiService,
    private userApiService: UserApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let user_id = params['id'];
      if (user_id) {
        this.fetchBlogByUserId(user_id);
        this.fetchUserById(user_id);
        this.fetchFollowers(user_id);
        this.fetchFollowing(user_id);
      }
    });
  }

  fetchBlogByUserId(user_id: any) {
    this.blogLoading = true;
    this.blogApiService.fetchBlogByUserId(user_id).subscribe({
      next: (data: any) => {
        this.blogs = data.data;
        console.log(data.data);
        this.blogLoading = false;
      },
      error: (err) => {
        this.blogLoading = false;
        console.log(err);
      },
    });
  }

  fetchUserById(user_id: any) {
    this.userLoading = true;
    this.userApiService.fetchUserById(user_id).subscribe({
      next: (data: any) => {
        this.user = data.data;
        console.log(data.data);
        this.userLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.userLoading = false;
      },
    });
  }

  fetchFollowers(user_id: any) {
    this.followersLoading = true;
    this.followApiService.fetchFollowers(user_id).subscribe({
      next: (data: any) => {
        this.followers = data.data;
        console.log(data.data);
        this.followersLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.followersLoading = false;
      },
    });
  }

  fetchFollowing(user_id: any) {
    this.followingLoading = true;
    this.followApiService.fetchFollowing(user_id).subscribe({
      next: (data: any) => {
        this.following = data.data;
        console.log(data.data);
        this.followingLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.followingLoading = false;
      },
    });
  }

  showSection(section: string) {
    this.activeSection = section;
  }

  navigateToProfile() {
    this.activeSection = 'profile';
  }
}
