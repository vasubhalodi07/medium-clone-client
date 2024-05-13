import { Component, OnDestroy, OnInit } from '@angular/core';
import { TagApiService } from '../../../../core/services/tag-api.service';
import { Editor } from 'ngx-editor';
import { BlogApiService } from '../../../../core/services/blog-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-update',
  templateUrl: './blog-update.component.html',
  styleUrls: ['./blog-update.component.css'],
})
export class BlogUpdateComponent implements OnInit, OnDestroy {
  tags: any;
  editor: Editor = new Editor();
  html: string = '';
  blogTitle: string = '';
  selectedTags: any[] = [];
  selectedFile: File | null = null;
  blogId: any;

  constructor(
    private tagApiService: TagApiService,
    private blogApiService: BlogApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.blogId = id;
        this.fetchBlogById(id);
      }
    });

    this.fetchTagsCall();
  }

  ngOnDestroy(): void {}

  fetchBlogById(id: any) {
    this.blogApiService.fetchBlogById(id).subscribe({
      next: (data: any) => {
        this.blogTitle = data.data.title;
        this.html = data.data.content;
        this.selectedTags = this.tags.map((tag: any) => tag.id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  fetchTagsCall() {
    this.tagApiService.fetchTags().subscribe({
      next: (data: any) => {
        this.tags = data.data;
      },
      error: (err: any) => {
        console.log(err);
        this.selectedTags = [];
      },
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.blogTitle);
    formData.append('content', this.html);
    formData.append('tags', JSON.stringify(this.selectedTags));

    if (this.selectedFile) {
      formData.append('blog_image', this.selectedFile);
    }

    this.blogApiService.updateBlog(this.blogId, formData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.router.navigate(['/blog/fetch/' + this.blogId]);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  backNavigate() {
    this.router.navigate(['/blog/fetch/' + this.blogId]);
  }
}
