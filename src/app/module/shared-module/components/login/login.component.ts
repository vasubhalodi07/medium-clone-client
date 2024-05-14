import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserApiService } from '../../../../core/services/user-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Input() loginShowModel: boolean = false;
  @Output() close = new EventEmitter<void>();

  flagModel: number = 1;
  email: string = '';
  sendMailLoading: boolean = false;

  constructor(private userApiService: UserApiService) {}

  closeModel() {
    this.close.emit();
  }

  changeflagModel(value: number) {
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
