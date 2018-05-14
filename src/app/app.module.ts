import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from 'ng-fullcalendar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
// -----Services-----//
import {EventService} from '../app/modules/calendar/components/calendar/event.service';

import { services } from './app.services';
import { LayoutComponent } from './features/layout/layout.component';
import { HeaderComponent } from './features/layout/components/header/header.component';
import { LeftSidebarComponent } from './features/layout/components/left-sidebar/left-sidebar.component';
import { FullCalendarComponent } from './modules/calendar/components/calendar/calendar.component';

import { DatePickerComponent } from './modules/calendar/components/date-picker/date-picker.component';
import { DatePickerDirective } from './modules/calendar/components/date-picker/date-picker.directive';
import { ColorPickerModule } from 'ngx-color-picker';
 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    LeftSidebarComponent,
    LayoutComponent,
    FullCalendarComponent,
    DatePickerComponent,
    DatePickerDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    
    ColorPickerModule
  ],
  providers: [services,EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
