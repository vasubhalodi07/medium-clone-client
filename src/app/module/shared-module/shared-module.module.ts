import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommentComponent } from './components/comment/comment.component';
import { FormsModule } from '@angular/forms';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';

@NgModule({
  declarations: [
    NavbarComponent,
    CommentComponent,
    DeleteConfirmationComponent,
    ProfileEditComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    NavbarComponent,
    CommentComponent,
    DeleteConfirmationComponent,
    ProfileEditComponent,
  ],
})
export class SharedModuleModule {}
