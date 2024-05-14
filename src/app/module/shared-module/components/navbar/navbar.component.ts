import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isMenuOpen: boolean = false;
  searchQuery: string = '';
  token: any;

  loginShowModel: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }

  closeModel() {
    this.loginShowModel = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  navigateAddBlog() {
    this.router.navigate(['/blog/add']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/']);
  }

  navigateProfile() {
    let id = localStorage.getItem('id');
    this.router.navigate(['/user/' + id]);
  }

  search() {
    this.router.navigate(['/dashboard'], {
      queryParams: { q: this.searchQuery },
    });
  }

  openLoginModel() {
    console.log('called');
    this.loginShowModel = true;
  }
}
