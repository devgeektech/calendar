import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { UiSwitchModule } from 'angular2-ui-switch';
import { ColorPickerModule } from 'ngx-color-picker';
import { DatePickerDirective } from './components/datepicker/date-picker.directive';
import {FilterPipe} from '../../shared/pipes/filter.pipe';
import  { DatePickerComponent } from './components/datepicker/datepicker.component'
@NgModule({
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    UiSwitchModule,
    ColorPickerModule
  ],
  declarations: [CalendarComponent, DatePickerComponent,DatePickerDirective,FilterPipe]
})
export class CalendarModule { }
