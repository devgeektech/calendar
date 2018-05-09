import { Component, OnInit,ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService } from '../../event.service';
//import { CalendarService } from '../../calendar.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class FullCalendarComponent implements OnInit {
  calendarOptions: Options;
  public calendarResult: any;
  displayEvent: any;
  events = null;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(protected eventService: EventService,protected router: Router) { }

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

    //this.getScheduleCalendar()
    this.calendarResult =[
      {
          "_id": "5af03eaff0969f52a0db56e8",
          "externalId": "ex1234",
          "name": "test calendar 1",
          "schedules": [
              "5af036b98914a24f6bb00807",
              "5af037888914a24f6bb00808",
              "5af037ec8914a24f6bb00809"
          ],
          "active": "true",
          "emailNotificationList": [
              "kuppal@aadhya-analytics.com",
              "raheem@aadhya-analytics.com",
              "sunil@aadhya-analytics.com"
          ],
          "emailNotificationEnabled": "false",
          "createdDate": "1522520474547",
          "createdDateString": "31-03-2018",
          "createdId": "emp0001",
          "createdName": "konark",
          "lastModifiedDate": "1522520474547",
          "lastModifiedDateString": "31-03-2018",
          "lastModifiedId": "emp0001",
          "lastModifiedName": "konark",
          "accountId": "acc1001",
          "status": "1",
          "resourceBundleId": "RSB005",
          "orgId": "001",
          "timestamp": "2018-05-07T11:55:27.781Z"
      },
      {
          "_id": "5af03f3ff0969f52a0db56e9",
          "externalId": "ex1235",
          "name": "test calendar 2",
          "schedules": [
              "5af036b98914a24f6bb00807",
              "5af03c3f3cdeac5215b6156e",
              "5af037ec8914a24f6bb00809"
          ],
          "active": "true",
          "emailNotificationList": [
              "kuppal@aadhya-analytics.com",
              "raheem@aadhya-analytics.com",
              "sunil@aadhya-analytics.com"
          ],
          "emailNotificationEnabled": "false",
          "createdDate": "1522520474547",
          "createdDateString": "31-03-2018",
          "createdId": "emp0001",
          "createdName": "konark",
          "lastModifiedDate": "1522520474547",
          "lastModifiedDateString": "31-03-2018",
          "lastModifiedId": "emp0001",
          "lastModifiedName": "konark",
          "accountId": "acc1001",
          "status": "1",
          "resourceBundleId": "RSB005",
          "orgId": "001",
          "timestamp": "2018-05-07T11:57:51.052Z"
      },
      {
          "_id": "5af03f79f0969f52a0db56ea",
          "externalId": "ex1236",
          "name": "test calendar 3",
          "schedules": [
              "5af036b98914a24f6bb00807",
              "5af03c3f3cdeac5215b6156e"
          ],
          "active": "false",
          "emailNotificationList": [
              "kuppal@aadhya-analytics.com",
              "raheem@aadhya-analytics.com",
              "sunil@aadhya-analytics.com"
          ],
          "emailNotificationEnabled": "false",
          "createdDate": "1522520474547",
          "createdDateString": "31-03-2018",
          "createdId": "emp0001",
          "createdName": "konark",
          "lastModifiedDate": "1522520474547",
          "lastModifiedDateString": "31-03-2018",
          "lastModifiedId": "emp0001",
          "lastModifiedName": "konark",
          "accountId": "acc1001",
          "status": "1",
          "resourceBundleId": "RSB005",
          "orgId": "001",
          "timestamp": "2018-05-07T11:58:49.919Z"
      },
      {
          "_id": "5af14bcfb1b5110e34332b1c",
          "externalId": "ex1236",
          "name": "test calendar 3",
          "schedules": [
              "5af036b98914a24f6bb00807",
              "5af03c3f3cdeac5215b6156e"
          ],
          "active": "false",
          "emailNotificationList": [
              "kuppal@aadhya-analytics.com",
              "raheem@aadhya-analytics.com",
              "sunil@aadhya-analytics.com"
          ],
          "emailNotificationEnabled": "false",
          "createdDate": "1522520474547",
          "createdDateString": "31-03-2018",
          "createdId": "emp0001",
          "createdName": "konark",
          "lastModifiedDate": "1522520474547",
          "lastModifiedDateString": "31-03-2018",
          "lastModifiedId": "emp0001",
          "lastModifiedName": "konark",
          "accountId": "acc1001",
          "status": "1",
          "resourceBundleId": "RSB005",
          "orgId": "001",
          "timestamp": "2018-05-08T07:03:43.318Z"
      }
  ]
  
  }

  //getScheduleCalendar() {
   // this._calendarService.getSchedulingCalendar().subscribe(
     // data => {  this.calendarResult = data},
     // err => {  }
    //);
  //}
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