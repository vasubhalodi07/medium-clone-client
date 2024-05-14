import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.css'],
})
export class RightComponent {
  @Input() following: any;
  @Input() followingLoading: boolean = false;

  @Input() followers: any;
  @Input() followersLoading: boolean = false;

  @Input() user: any;
  @Input() userLoading: boolean = false;

  @Output() showSection = new EventEmitter<string>();

  showModel: boolean = false;
  editBlogLoading: boolean = false;

  constructor(private router: Router) {}

  editProfile() {
    this.showModel = true;
  }

  cancelEdit() {
    this.showModel = false;
  }

  edit(updatedProfile: any) {
    console.log(updatedProfile);
  }

  getCountFollowers() {
    return this.followers.length;
  }

  navigateToFollowers() {
    this.showSection.emit('followers');
  }

  navigateToFollowing() {
    this.showSection.emit('following');
  }
}
