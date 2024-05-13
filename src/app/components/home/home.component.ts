import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from '../../core/services/user-api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isSignInModalOpen: boolean = false;
  isTokenValidLoading: boolean = false;
  isExpire: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userApiService: UserApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isExpire = false;
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      const auth = params['auth'];
      if (token) {
        this.checkTokens(token);
      }
      if (auth) {
        this.loginTokenCheck(auth);
      }
    });
  }

  checkTokens(token: string) {
    this.isTokenValidLoading = true;
    this.userApiService.checkToken(token).subscribe({
      next: (res: any) => {
        this.isTokenValidLoading = false;
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('id', res.id);

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.isExpire = true;
        } else {
          console.error(err);
        }
        this.isTokenValidLoading = false;
      },
    });
  }

  loginTokenCheck(token: string) {
    this.isTokenValidLoading = true;
    this.userApiService.userCheckToken(token).subscribe({
      next: (res: any) => {

        console.log(res);

        this.isTokenValidLoading = false;
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('id', res.id);

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.isExpire = true;
        } else {
          console.error(err);
        }
        this.isTokenValidLoading = false;
      },
    });
  }

  openSignInModal() {
    console.log(this.isSignInModalOpen);
    this.isSignInModalOpen = true;
  }

  home() {
    this.isSignInModalOpen = false;
    this.isTokenValidLoading = false;
    this.isExpire = false;
    this.router.navigate(['/']);
  }
}
