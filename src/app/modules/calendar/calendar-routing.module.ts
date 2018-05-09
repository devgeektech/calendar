import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullCalendarComponent } from './components/calendar/calendar.component';

const routes: Routes = [
	{
		path: 'calendar',
		component: FullCalendarComponent
	
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
