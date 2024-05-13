import { Component, OnInit } from '@angular/core';
import { BlogApiService } from '../../../../core/services/blog-api.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private blogApiService: BlogApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user_id = localStorage.getItem('id');
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.blogId = id;
    this.fetchBlogById(id);
  }

  fetchBlogById(id: any) {
    this.blogApiService.fetchBlogById(id).subscribe({
      next: (data: any) => {
        this.blog = data.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
