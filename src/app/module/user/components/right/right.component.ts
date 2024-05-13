import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../../../core/services/user-api.service';
import { ActivatedRoute } from '@angular/router';
import { FollowApiService } from '../../../../core/services/follow-api.service';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.css'],
})
export class RightComponent implements OnInit {
  users: any;
  profile: any;

  showModel: boolean = false;
  editBlogLoading: boolean = false;

  constructor(
    private userApiService: UserApiService,
    private activatedRoute: ActivatedRoute,
    private followApiService: FollowApiService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let userId = params['id'];
      if (userId) {
        this.fetchUserById(userId);
        this.fetchFollowedUsersMeth(userId);
      }
    });
  }

  fetchFollowedUsersMeth(user_id: any) {
    this.followApiService.fetchFollowing(user_id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.users = data.data;
      },
      error: (err) => {
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

  editProfile() {
    this.showModel = true;
  }

  cancelEdit() {
    this.showModel = false;
  }

  edit(updatedProfile: any) {
    console.log(updatedProfile);
    console.log(this.profile);
    console.log('edit blog');
  }

  getCountFollowers() {
    return this.users.length;
  }
}
