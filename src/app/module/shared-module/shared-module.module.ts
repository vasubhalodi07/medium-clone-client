import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommentComponent } from './components/comment/comment.component';
import { FormsModule } from '@angular/forms';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    NavbarComponent,
    CommentComponent,
    DeleteConfirmationComponent,
    ProfileEditComponent,
    LoginComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    NavbarComponent,
    CommentComponent,
    DeleteConfirmationComponent,
    ProfileEditComponent,
    LoginComponent,
  ],
})
export class SharedModuleModule {}
