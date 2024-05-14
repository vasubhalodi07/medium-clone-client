import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from '../../core/services/user-api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css',
})
export class AuthenticationComponent implements OnInit {
  isTokenValidLoading: boolean = false;
  isExpire: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userApiService: UserApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isExpire = false;
    const checkTokenCalled = localStorage.getItem('checkTokenCalled');
    if (!checkTokenCalled) {
      this.route.queryParams.subscribe((params) => {
        const token = params['token'];
        if (token) {
          this.checkTokens(token);
        }
      });
    }

    const loginTokenCheck = localStorage.getItem('loginTokenCalled');
    if (!loginTokenCheck) {
      this.route.queryParams.subscribe((params) => {
        const auth = params['auth'];
        if (auth) {
          this.loginTokenCheck(auth);
        }
      });
    }
  }

  checkTokens(token: string) {
    this.isTokenValidLoading = true;
    this.userApiService.checkToken(token).subscribe({
      next: (res: any) => {
        localStorage.setItem('checkTokenCalled', 'true');
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('id', res.id);

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.isExpire = true;
        } else {
          this.router.navigate(['/']);
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
        this.isTokenValidLoading = false;
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('id', res.id);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.isExpire = true;
        } else {
          this.router.navigate(['/']);
          console.error(err);
        }
        this.isTokenValidLoading = false;
      },
    });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
