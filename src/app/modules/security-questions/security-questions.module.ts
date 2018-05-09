import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SecurityQuestionsRoutingModule } from './security-questions-routing.module';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';

@NgModule({
  imports: [
    CommonModule,
    SecurityQuestionsRoutingModule,
    FormsModule
  ],
  declarations: [QuestionsListComponent]
})
export class SecurityQuestionsModule { }
