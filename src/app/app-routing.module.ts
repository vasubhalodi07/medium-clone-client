import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './core/guard/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    component: AuthenticationComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./module/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./module/blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./module/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'tag',
    loadChildren: () =>
      import('./module/tag/tag.module').then((m) => m.TagModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
