import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http'
import { AppRoutingModule } from './app-routing.module';
import {CalendarModule} from '../app/modules/calendar/calendar.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { services } from './app.services';
import { LayoutComponent } from './features/layout/layout.component';
import { HeaderComponent } from './features/layout/components/header/header.component';
import { LeftSidebarComponent } from './features/layout/components/left-sidebar/left-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    LeftSidebarComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CalendarModule,
    
    
    
    
    
  ],
  providers: [services],
  bootstrap: [AppComponent]
})
export class AppModule { }
