import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrl: './left.component.css',
})
export class LeftComponent {
  @Input() blogs: any;
  @Input() blogsLoading: boolean = false;

  @Input() tags: any;
  @Input() tagsLoading: boolean = false;

  @Output() filterTag: EventEmitter<string> = new EventEmitter<string>();

  selectedTag: string = '';

  constructor(private router: Router) {
    console.log(this.blogsLoading);
  }

  navigateBlog(id: any) {
    this.router.navigate([`/blog/fetch/${id}`]);
  }

  filterByTag() {
    this.filterTag.emit(this.selectedTag);
  }
}
