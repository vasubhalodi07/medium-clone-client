import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediumComponent } from './components/medium/medium.component';
import { DashboardRouterModule } from './dashboard-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { LeftComponent } from './components/left/left.component';
import { RightComponent } from './components/right/right.component';

@NgModule({
  declarations: [MediumComponent, LeftComponent, RightComponent],
  imports: [CommonModule, DashboardRouterModule, SharedModuleModule],
})
export class DashboardModule {}
