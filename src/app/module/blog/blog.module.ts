import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { BlogAddComponent } from './components/blog-add/blog-add.component';
import { BlogUpdateComponent } from './components/blog-update/blog-update.component';
import { BlogRoutingModule } from './blog-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BlogDetailsComponent, BlogAddComponent, BlogUpdateComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModuleModule,
    NgxEditorModule,
    FormsModule,
  ],
})
export class BlogModule {}
