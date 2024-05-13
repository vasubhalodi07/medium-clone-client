import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../../../core/services/user-api.service';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrl: './right.component.css',
})
export class RightComponent implements OnInit {
  users: any;

  constructor(private userApiService: UserApiService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userApiService.fetchUser().subscribe({
      next: (data: any) => {
        this.users = data.data;
        console.log(this.users);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
