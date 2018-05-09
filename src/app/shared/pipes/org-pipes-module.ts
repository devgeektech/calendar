import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SafeHtmlPipe } from '../../shared/pipes/html-safe.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SafeHtmlPipe],
  exports: [SafeHtmlPipe]
})
export class OrgPipesModule { }
