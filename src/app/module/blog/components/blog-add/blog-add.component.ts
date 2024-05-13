import { Component, OnDestroy, OnInit } from '@angular/core';
import { TagApiService } from '../../../../core/services/tag-api.service';
import { Editor } from 'ngx-editor';
import { BlogApiService } from '../../../../core/services/blog-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrl: './blog-add.component.css',
})
export class BlogAddComponent implements OnInit, OnDestroy {
  tags: any;
  editor: Editor = new Editor();
  html: string = '';
  blogTitle: string = '';
  selectedTags: any[] = [];
  selectedFile: File | null = null;

  constructor(
    private tagApiService: TagApiService,
    private blogApiService: BlogApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchTagsCall();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  fetchTagsCall() {
    this.tagApiService.fetchTags().subscribe({
      next: (data: any) => {
        this.tags = data.data;
        console.log(data.data);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('title', this.blogTitle);
    formData.append('content', this.html);
    formData.append('tags', JSON.stringify(this.selectedTags));

    if (this.selectedFile) {
      formData.append('blog_image', this.selectedFile);
    }

    this.blogApiService.addBlog(formData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  backNavigate() {
    this.router.navigate(['/dashboard']);
  }
}
