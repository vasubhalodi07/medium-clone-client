import { Component, OnInit } from '@angular/core';
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

  blogs: any;
  blogLoading: boolean = false;
  blogEmpty: boolean = false;

  user: any;

  id: any;

  editEnabled: boolean = false;

  constructor(
    private blogApiService: BlogApiService,
    private userApiService: UserApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = localStorage.getItem('id');
    this.id = id;

    this.activatedRoute.params.subscribe((params) => {
      let userId = params['id'];
      if (userId) {
        this.fetchBlogByUserId(userId);
        this.fetchUserById(userId);
      }
    });
  }

  fetchBlogByUserId(userId: any) {
    this.blogLoading = true;
    this.blogApiService.fetchBlogByUserId(userId).subscribe({
      next: (data: any) => {
        this.blogLoading = false;
        this.blogs = data.data;
        if (this.blogs.length === 0) {
          this.blogEmpty = true;
        } else {
          this.blogEmpty = false;
        }
      },
      error: (err) => {
        this.blogLoading = false;
        console.log(err);
      },
    });
  }

  fetchUserById(userId: any) {
    this.userApiService.fetchUserById(userId).subscribe({
      next: (data: any) => {
        this.user = data.data;
        console.log(data.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editEnabledFun() {
    this.editEnabled = true;
  }
  closeEditMode() {
    this.editEnabled = false;
  }
  saveContent() {
    console.log(this.user.about);
    if (this.user.about != '') {
      let body = {
        about: this.user.about,
      }

      this.userApiService
        .updateUserDetails(this.id, body)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.fetchUserById(this.id);
          },
          error: (err) => {
            console.log(err);
          },
        });
      this.editEnabled = false;
      this.fetchUserById(this.id);
    }
  }

  changeSection(item: string) {
    if (item === 'Home') {
      this.toggle = 0;
    }
    if (item === 'About') {
      this.toggle = 1;
    }
  }

  blogDetailsNavigation(id: any) {
    this.router.navigate(['/blog/fetch/' + id]);
  }

  deleteBlog(id: any) {
    console.log(id);

    this.blogApiService.deleteBlog(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.fetchBlogByUserId(this.id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateNavigation(id: any) {
    this.router.navigate(['/blog/update/' + id]);
  }

  likeBlog(id: any) {}
}
