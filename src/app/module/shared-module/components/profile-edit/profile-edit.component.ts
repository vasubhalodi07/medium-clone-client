import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css',
})
export class ProfileEditComponent {
  @Input() showModel: boolean = false;
  @Input() editBlogLoading: boolean = false;
  @Input() profile: any;

  @Output() cancel = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  updateProfile() {
    this.edit.emit(this.profile);
  }

  cancelProfile() {
    this.cancel.emit();
  }
}
