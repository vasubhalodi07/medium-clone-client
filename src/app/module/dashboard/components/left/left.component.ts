import { Component, OnInit } from '@angular/core';
import { BlogApiService } from '../../../../core/services/blog-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrl: './left.component.css',
})
export class LeftComponent implements OnInit {
  blogs: any = [];

  constructor(private blogApiService: BlogApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBlogs();
  }

  fetchBlogs() {
    this.blogApiService.fetchBlogs().subscribe({
      next: (data: any) => {
        this.blogs = data.data;
        console.log(data.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  navigateBlog(id: any) {
    console.log(id);
    this.router.navigate([`/blog/fetch/${id}`]);
  }
}
