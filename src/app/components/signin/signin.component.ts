import { Component } from '@angular/core';
import { UserApiService } from '../../core/services/user-api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  flagModel: number = 1;
  showModal: boolean = true;
  email: string = '';

  sendMailLoading: boolean = false;

  constructor(private userApiService: UserApiService) {}

  closeModal() {
    this.showModal = false;
  }

  changeflagModel(value: number) {
    console.log(value);
    this.flagModel = value;
  }

  sendMail() {
    this.sendMailLoading = true;
    this.userApiService.registerUser(this.email).subscribe({
      next: (data) => {
        this.sendMailLoading = false;
        console.log(data);
        this.flagModel = 3;
      },
      error: (err) => {
        this.sendMailLoading = false;
        console.log(err);
      },
    });
  }

  continoue() {
    this.sendMailLoading = true;
    this.userApiService.loginUser(this.email).subscribe({
      next: (data) => {
        this.flagModel = 3;
        console.log(data);
        this.sendMailLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.sendMailLoading = false;
      },
    });
  }
}
