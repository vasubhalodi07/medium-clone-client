import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isSignInModalOpen: boolean = false;
  isTokenValidLoading: boolean = false;
  isExpire: boolean = false;

  constructor(private router: Router) {}

  openSignInModal() {
    this.isSignInModalOpen = true;
  }

  home() {
    this.isSignInModalOpen = false;
    this.isTokenValidLoading = false;
    this.router.navigate(['/']);
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
