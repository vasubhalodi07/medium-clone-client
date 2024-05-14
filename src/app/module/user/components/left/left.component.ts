import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlogApiService } from '../../../../core/services/blog-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from '../../../../core/services/user-api.service';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrl: './left.component.css',
})
export class LeftComponent implements OnInit {
  items: string[] = ['Home', 'About'];
  toggle: number = 0;

  @Input() blogs: any;
  @Input() blogLoading: boolean = false;

  @Input() user: any;
  @Input() userLoading: boolean = false;

  @Input() following: any;
  @Input() followingLoading: boolean = false;

  @Input() followers: any;
  @Input() followersLoading: boolean = false;

  @Input() activeSection: any;

  @Output() navigateProfile = new EventEmitter<void>();

  id: any;
  editEnabled: boolean = false;

  blogId: any;
  blogDeleteLoading: boolean = false;

  showConfirmation: boolean = false;

  constructor(
    private blogApiService: BlogApiService,
    private userApiService: UserApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = localStorage.getItem('id');
    this.id = id;
  }

  navigateToProfile() {
    this.navigateProfile.emit();
  }

  changeSection(item: string) {
    if (item === 'Home') {
      this.toggle = 0;
    }
    if (item === 'About') {
      this.toggle = 1;
    }
  }

  editEnabledFun() {
    this.editEnabled = true;
  }
  closeEditMode() {
    this.editEnabled = false;
  }
  saveContent() {
    if (this.user.about != '') {
      let body = {
        about: this.user.about,
      };

      this.userApiService.updateUserDetails(this.id, body).subscribe({
        next: (data: any) => {
          console.log(data);
          // this.fetchUserById(this.id);
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.editEnabled = false;
      // this.fetchUserById(this.id);
    }
  }

  blogDetailsNavigation(id: any) {
    this.router.navigate(['/blog/fetch/' + id]);
  }

  deleteBlog(id: any) {
    console.log(id);
    this.blogId = id;
    this.showConfirmation = true;
  }

  confirmDelete() {
    this.blogDeleteLoading = true;
    this.blogApiService.deleteBlog(this.blogId).subscribe({
      next: (data: any) => {
        this.blogDeleteLoading = false;
        // this.fetchBlogByUserId(this.id);
        this.showConfirmation = false;
      },
      error: (err) => {
        this.blogDeleteLoading = false;
        console.log(err);
      },
    });
  }

  cancelDelete() {
    this.showConfirmation = false;
  }

  updateNavigation(id: any) {
    this.router.navigate(['/blog/update/' + id]);
  }

  countFollowers() {
    return this.followers.length;
  }

  countFollowing() {
    return this.following.length;
  }
}
