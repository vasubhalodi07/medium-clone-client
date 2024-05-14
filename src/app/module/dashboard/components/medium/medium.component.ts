import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogApiService } from '../../../../core/services/blog-api.service';
import { TagApiService } from '../../../../core/services/tag-api.service';

@Component({
  selector: 'app-medium',
  templateUrl: './medium.component.html',
  styleUrl: './medium.component.css',
})
export class MediumComponent implements OnInit {
  searchQuery: string = '';
  selectedTagId: any;

  blogs: any;
  blogsLoading: boolean = false;

  tags: any;
  tagsLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private blogApiService: BlogApiService,
    private tagApiService: TagApiService
  ) {}

  ngOnInit(): void {
    this.fetchTags();
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      this.fetchBlogs(this.searchQuery);
    });
  }

  fetchBlogs(query: string) {
    this.blogsLoading = true;
    this.blogApiService.fetchBlogs(query).subscribe({
      next: (data: any) => {
        this.blogs = data.data;
        console.log(data.data);
        this.blogsLoading = false;
      },
      error: (err) => {
        this.blogsLoading = false;
        console.log(err);
      },
    });
  }

  fetchTags() {
    this.tagsLoading = true;
    this.tagApiService.fetchTags().subscribe({
      next: (data: any) => {
        this.tags = data.data;
        console.log(data.data);
        this.tagsLoading = false;
      },
      error: (err) => {
        this.tagsLoading = false;
        console.log(err);
      },
    });
  }

  filterTag(tagId: any) {
    this.selectedTagId = tagId;
    console.log(this.selectedTagId);
  }
}
