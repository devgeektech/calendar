import { Component, OnInit,ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService } from '../../event.service';
import { CalendarService } from '../../calendar.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  providers: [EventService,CalendarService],
  styleUrls: ['./calendar.component.css']

})
export class FullCalendarComponent implements OnInit {

show:boolean=false;
  calendarOptions: Options;
  public calendarResult: any;
  displayEvent: any;
  events = null;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(protected eventService: EventService,protected router: Router,protected _calendarService:CalendarService) { }

  ngOnInit() {
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: []
    };

    this.getScheduleCalendar()
   
  
  }
  
  getScheduleCalendar() {
    
    this._calendarService.getSchedulingCalendar().subscribe(
      data =>   this.calendarResult = data);
  }
  loadevents() {
    console.log("test")
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }
  clickButton(model: any) {
    this.displayEvent = model;
  }
  dayClick(model: any) {
    console.log(model);
  }
  eventClick(model: any) {
    
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }
  

  
 
}