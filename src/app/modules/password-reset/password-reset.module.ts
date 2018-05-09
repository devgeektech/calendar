import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PasswordResetRoutingModule } from './password-reset-routing.module';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    PasswordResetRoutingModule,
    FormsModule
  ],
  declarations: [ResetPasswordComponent]
})
export class PasswordResetModule { }
