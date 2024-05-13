import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommentComponent } from './components/comment/comment.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavbarComponent, CommentComponent],
  imports: [CommonModule, FormsModule],
  exports: [NavbarComponent, CommentComponent],
})
export class SharedModuleModule {}
