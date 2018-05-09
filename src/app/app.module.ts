import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from 'ng-fullcalendar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
// -----Services-----//
import {EventService} from '../app/modules/calendar/event.service';

import { services } from './app.services';
import { LayoutComponent } from './features/layout/layout.component';
import { HeaderComponent } from './features/layout/components/header/header.component';
import { LeftSidebarComponent } from './features/layout/components/left-sidebar/left-sidebar.component';
import { FullCalendarComponent } from './modules/calendar/components/calendar/calendar.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    LeftSidebarComponent,
    LayoutComponent,
    FullCalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FullCalendarModule
  ],
  providers: [services,EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
