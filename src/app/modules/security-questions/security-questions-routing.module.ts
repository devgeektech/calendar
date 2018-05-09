import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';

const routes: Routes = [
	{
		path: '',
		component: QuestionsListComponent,
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityQuestionsRoutingModule { }
