import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { LeftComponent } from './components/left/left.component';
import { RightComponent } from './components/right/right.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent, LeftComponent, RightComponent],
  imports: [CommonModule, UserRoutingModule, SharedModuleModule, FormsModule],
})
export class UserModule {}
