import { Component, OnInit,ViewChild,Input } from '@angular/core';

import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService } from './event.service';
import { CalendarService } from '../../calendar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, Form, NgForm } from '@angular/forms';





@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  providers: [EventService,CalendarService],
  styleUrls: ['./calendar.component.css']

})
export class FullCalendarComponent implements OnInit {
  calendarForm: FormGroup;
  shiftForm: FormGroup;
  calendar_name = new FormControl('', [
    Validators.required
  ]);
  report_to = new FormControl('', [
  Validators.required
  ]);


  shift_name = new FormControl('', [
    Validators.required
  ]);
  shift_datetime = new FormControl('', [
  Validators.required
  ]);
  
show:boolean=false;
calendarid:string="";
 EditCalendarResult:any;
//  ----
statusCode:number;
calendarOptions: Options;
displayEvent: any;
events = null;
  public calendarResult: any;

  
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(protected formBuilder: FormBuilder,protected eventService: EventService,protected router: Router,protected _calendarService:CalendarService) { }

  ngOnInit() {
    this.calendarForm = this.formBuilder.group({
      calendar_name: this.calendar_name,
      report_to: this.report_to
      
    });

    this.shiftForm = this.formBuilder.group({
      shift_name: this.shift_name,
      shift_datetime: this.shift_datetime
      
    });
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
  setClassCalendarName() {
    return { 'has-danger': !this.calendar_name.pristine && !this.calendar_name.valid };
  }
 setClassReportTo() {
    return { 'has-danger': !this.report_to.pristine && !this.report_to.valid };
  }

  setClassShiftName() {
    return { 'has-danger': !this.shift_name.pristine && !this.shift_name.valid };
  }
  setClassShiftDateTime() {
    return { 'has-danger': !this.shift_datetime.pristine && !this.shift_datetime.valid };
  }

  getScheduleCalendar() {
    
    this._calendarService.getSchedulingCalendar().subscribe(
      data =>   this.calendarResult = data);
  }
  loadevents() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

  addEvent(){
    const dateObj = new Date();
    const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
    let abc = {
      id: 999,
      title: 'Yoyo',
      start: yearMonth + '-01',
      end: yearMonth + '-01'
  };
    this.events.push(abc);
    console.log(this.events);
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
  
  
  
  //This function is bound to a ModalTwo button.
public clickModalTwo() {
  console.log("Test post onclick");
  console.log("post",this.calendarForm.value);
  let calendarData = 
    { "externalId": "ex1234",
    "name": this.calendarForm.value.calendar_name,
    "schedules": [
        "5af036b98914a24f6bb00807",
        "5af037888914a24f6bb00808",
        "5af037ec8914a24f6bb00809"
    ],
    "active": "true",
    "emailNotificationList": [
      this.calendarForm.value.report_to,
    ],
    "emailNotificationEnabled": "false",
    "createdDate": "1522520474547",
    "createdDateString":  new Date(),
    "createdId": "emp0001",
    "createdName": "konark",
    "lastModifiedDate": "1522520474547",
    "lastModifiedDateString": new Date(),
    "lastModifiedId": "emp0001",
    "lastModifiedName": "konark",
    "accountId": "acc1001",
    "status": "1",
    "resourceBundleId": "RSB005",
    "orgId": "001",
    "timestamp": new Date()
 }

    this._calendarService.createNewCalendar(calendarData).subscribe(
       data => {
         // refresh the list
         this.getScheduleCalendar();
         //return true;
       },
       error => {
         console.error("Error saving New Calendar!");
        // return Observable.throw(error);
       }
    );
}
 
public OpenCalendarModel(_id: string) {
  console.log("Selected Id",_id);
this.calendarid=_id;
  this.show = true;
 
}

closeCalendarModel() {
  this.show = false;
  
}

public EditCalendar(calendarid: string)
 {
   console.log("Edit Id",calendarid);
   this._calendarService.getSchedulingCalendarByCalendarID(calendarid).subscribe(
    data =>  { this.EditCalendarResult = data[0]
    console.log("Edit data",this.EditCalendarResult)
    });


 }
 public clickModalTwoEdit() {
  
  console.log("Test Edit onclick",this.calendarid);
  console.log("post",this.calendarForm.value);
  let calendarData = 
    { 
     // "_id": this.calendarid,
      "externalId": "ex1234",
    "name": this.calendarForm.value.calendar_name,
    "schedules": [
        "5af036b98914a24f6bb00807",
        "5af037888914a24f6bb00808",
        "5af037ec8914a24f6bb00809"
    ],
    "active": "true",
    "emailNotificationList": [
      this.calendarForm.value.report_to,
    ],
    "emailNotificationEnabled": "false",
    "createdDate": "1522520474547",
    "createdDateString":  new Date(),
    "createdId": "emp0001",
    "createdName": "konark",
    "lastModifiedDate": "1522520474547",
    "lastModifiedDateString": new Date(),
    "lastModifiedId": "emp0001",
    "lastModifiedName": "konark",
    "accountId": "acc1001",
    "status": "1",
    "resourceBundleId": "RSB005",
    "orgId": "001",
    "timestamp": new Date()
 }

    this._calendarService.updateCalendar(this.calendarid,calendarData).subscribe(
       data => {
         // refresh the list
         this.getScheduleCalendar();
         //return true;
       },
       error => {
         console.error("Error saving New Calendar!");
        // return Observable.throw(error);
       }
    );
}
// ----Delete Calendar----//
DeleteCalendar(calendarid) {

  this._calendarService.deleteCalendar(calendarid)
    .subscribe(successCode => {
  //this.statusCode = successCode;
    //Expecting success code 204 from server
  this.statusCode = 204;
  this.getScheduleCalendar();
  return true;
},
errorCode => this.statusCode = errorCode);    

 }
// public DeleteCalendar(calendarid: string)
//  {
//    console.log("Delete Id",calendarid);
//    this._calendarService.deleteCalendar(calendarid).subscribe(
//     data => {
//       // refresh the list
//       this.getScheduleCalendar();
//       //return true;
//     },
//     error => {
//       console.error("Error saving New Calendar!");
//      // return Observable.throw(error);
//      });

    }
  

 

