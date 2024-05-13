import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { BlogAddComponent } from './components/blog-add/blog-add.component';
import { BlogUpdateComponent } from './components/blog-update/blog-update.component';

const routes: Routes = [
  {
    path: 'fetch/:id',
    component: BlogDetailsComponent,
  },
  {
    path: 'add',
    component: BlogAddComponent,
  },
  {
    path: 'update/:id',
    component: BlogUpdateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
