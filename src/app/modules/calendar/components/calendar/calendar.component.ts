import { Component, OnInit,ViewChild,Input } from '@angular/core';

import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService } from './event.service';
import { CalendarService } from '../../calendar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, Form, NgForm } from '@angular/forms';
import { Binary } from '@angular/compiler';

import { UiSwitchModule } from 'angular2-ui-switch';

import { DatePipe } from '@angular/common';


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
 EditShiftResult:any;
//  ----
statusCode:number;
calendarOptions: Options;
displayEvent: any;
events = null;
  public calendarResult: any;
  public calendarShiftResult:any;
  private color: string = "#0299e5";
  private status:string="InActive";
  isChecked:boolean=false;
  
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
    this.getCalendarByFromDateandToDate()
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

  // ----Get Schedule Calendar All List----//
  getScheduleCalendar() {
    
    this._calendarService.getSchedulingCalendar().subscribe(
      data =>   this.calendarResult = data);
  }
  // ----Get Schedule Calendar All List----

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
  
  
  
  // ----Create Calendar----//
public clickModalTwo() {
  console.log("Test post onclick");
  console.log("post",this.calendarForm.value);
  //let reportToArray=[];
 // reportToArray.push(this.calendarForm.value.report_to);
//console.log(reportToArray);

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
    "status": "0",
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
 // ----Create Calendar----//


public OpenCalendarModel(_id: string) {
  console.log("Selected Id",_id);
this.calendarid=_id;

this._calendarService.getSchedulingCalendarByCalendarID(this.calendarid).subscribe(
  data =>  { this.EditCalendarResult = data[0]
  console.log("Edit data",this.EditCalendarResult)
  if(this.EditCalendarResult.active=='0')
  {
    console.log("onclick InActive")
    this.status="InActive";
    this.isChecked=false;
  }
  else if(this.EditCalendarResult.active=='1')
  {
    console.log("onclick Active")
    this.status="Active";
    this.isChecked=true;
  }
  
  });

  
  
  this.show = true;
  }



  

closeCalendarModel() {
  this.status="InActive";
  this.isChecked=false;
  this.show = false;

}
// ----Edit Calendar----//
public EditCalendar(calendarid: string)
 {
   console.log("Edit Id",calendarid);
   this._calendarService.getSchedulingCalendarByCalendarID(calendarid).subscribe(
    data =>  { this.EditCalendarResult = data[0]
    console.log("Edit data",this.EditCalendarResult)
    
    });
  }
// ----Edit Calendar----//

 // ----Update Calendar----//
 public clickModalTwoEdit()
  {
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
    "status": "0",
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
// ----Update Calendar----//


// ----Delete Calendar----//
DeleteCalendar(calendarid) {
      
  this._calendarService.deleteCalendar(calendarid)
    .subscribe(successCode => {
  //this.statusCode = successCode;
    //Expecting success code 204 from server
  this.statusCode = 204;
  this.getScheduleCalendar();
  this.show= false;
  return true;
},
errorCode => this.statusCode = errorCode);    

 }

 // ----Update Calendar Status----//
 public UpdateCalendarStatus(event) {
  console.log("Update  Calendar Status",this.calendarid,event);
  let calendarData:any
  if(event==true){
  calendarData = 
    { 
      "status": "1"
    }
  }
  else if(event==false)
  {
    calendarData = 
    { 
      "status": "0"
    }
  }
  this._calendarService.updateCalendarStatus(this.calendarid,calendarData).subscribe(
       data => {
       // this.getScheduleCalendar();
       this._calendarService.getSchedulingCalendarByCalendarID(this.calendarid).subscribe(
        data =>  { this.EditCalendarResult = data[0]
        console.log("Edit data",this.EditCalendarResult)
        if(this.EditCalendarResult.active=='0')
        {
          this.status="InActive";
          this.isChecked=false;
        }
        else if(this.EditCalendarResult.active=='1')
        {
          this.status="Active";
          this.isChecked=true;
        }
        
        });
    
         },
       error => {
         console.error("Error updating  Calendar Status!");
        }
    );
  }
// ----Update Calendar Status----//

// ----Get Scheduling  Shift----//
 getSchedulingShift() {
  this._calendarService.getSchedulingShift().subscribe(
    data =>   this.calendarShiftResult = data);
}
// ----Get Schedule Calendar Shift----//

// ----Create  Shift----//
  public clickModalShift() {
  // this.calendarid= "5af03f3ff0969f52a0db56e9";
    console.log("post ",this.shiftForm.value);
    var datePipe = new DatePipe("en-US");
    let sDate = datePipe.transform(this.shiftForm.value.shift_datetime, "short");
    var splitString = sDate.split(',');
    let shiftDate = datePipe.transform(splitString[0], "dd/MM/yyyy");
  let shiftTime=splitString[1];
  console.log(sDate,shiftDate,shiftTime)
let shiftData = 
{
  "name": this.shiftForm.value.shift_name,
 // "name":this.shiftForm.value.shift_name,
  "details": null,
  "staffing": [
      "EMP001",
      "EMP002",
      "EMP003"
  ],
  "mandatory": [
      "1",
      "2"
    ],
  "m_accepted": [
      "1"
  ],
  "optional": [],
  "o_accepted": [],
  "start_date": shiftDate,
  "start_time": shiftTime,
  "end_date": shiftDate,
  "end_time": shiftTime,
  "recurrence": true,
  "recType": "daily",
  "every": "1",
  "on": {
      "days": null,
      "date": null,
      "order": null,
      "month": null
  },
  "endRec": {
      "occurance": null,
      "endbyDate": new Date()
  },
  "endRecDate": new Date(),
  "active": true,
  "timestamp":new Date()
}
   this._calendarService.createNewShift(shiftData).subscribe(
         data => {
          this.calendarResult = data
    let shift=
     {
    "schedules" :data.scheduleId
    }
     this._calendarService.createNewCalendarShift(this.calendarid
,shift).subscribe(
      data => {
       //this.calendarResult = data
        // refresh the list
        //this.getSchedulingShift();
        //return true;
      },
      error => {
        console.error("Error saving New calendar Shift!");
       // return Observable.throw(error);
      }
   );
},
error => {
           console.error("Error saving New Shift!");
          // return Observable.throw(error);
         }
      );
  }
   // ----Create  Shift----//

//---Edit Shift buy shiftid 
// ----Edit Calendar----//
public Edit(shiftid: string)
 {
   console.log("Edit Id",shiftid);
   this._calendarService.getSchedulingShift_Shiftid(shiftid).subscribe(
    data =>  { this.EditShiftResult = data[0]
    console.log("Edit data",this.EditCalendarResult)
    });
}

// ----Update  Shift----//
   public UpdateShift() 
   {
    var datePipe = new DatePipe("en-US");
    let shiftDate = datePipe.transform(this.shiftForm.value.shift_datetime, 'dd-mm-yyyy');
  let shiftTime= datePipe.transform(this.shiftForm.value.shift_datetime,"hh:mm");
  console.log(shiftDate,shiftTime)
let updateshiftData = 
{
  "name": this.shiftForm.value.shift_name,
 // "name":this.shiftForm.value.shift_name,
  "details": null,
  "staffing": [
      "EMP001",
      "EMP002",
      "EMP003"
  ],
  "mandatory": [
      "1",
      "2"
  ],
  "m_accepted": [
      "1"
  ],
  "optional": [],
  "o_accepted": [],
  "start_date": shiftDate,
  "start_time": shiftTime,
  "end_date": shiftDate,
  "end_time": shiftTime,
  "recurrence": true,
  "recType": "daily",
  "every": "1",
  "on": {
      "days": null,
      "date": null,
      "order": null,
      "month": null
  },
  "endRec": {
      "occurance": null,
      "endbyDate": new Date()
  },
  "endRecDate": new Date(),
  "active": true
  }
this._calendarService.updateSchedulingShift(updateshiftData).subscribe(
         data => {
          this.getSchedulingShift();
        
         },
         error => {
           console.error("Error saving New Calendar!");
          // return Observable.throw(error);
         }
      );
  }
  // ----Update  Shift----//


// ----Delete Scheduling  Shift----//
DeleteShift(shiftid) {
  this._calendarService.deleteSchedulingShift(shiftid)
    .subscribe(successCode => {
  //this.statusCode = successCode;
    //Expecting success code 204 from server
  this.statusCode = 204;
  this.getSchedulingShift();
  this.show= false;
  return true;
},
errorCode => this.statusCode = errorCode);    
}
 //--delete scheduling shifts---------------

// ----Get Calendar  Shift----//
 getCalendarShift()
 {
this._calendarService.getCalendarShift(this.calendarid).subscribe(
    data =>   this.calendarShiftResult = data);
  }
// ----Get  Calendar Shift----//

//------update Calendar Shift
public UpdateCalendarShift() {
  console.log("Test post onclick");
  //console.log("post",this.calendarForm.value);
  let calendarshiftData = 
  {
    "calendarId":"5af03f3ff0969f52a0db56e9",
    "externalId":"ex1235",
    "name":"Calendar calendar",
    "schedules":[
      "s005",
      "s006"
    ],
    "active":"false",
    "emailNotificationList":[
      "kuppal@aadhya-analytics.com",
      "raheem@aadhya-analytics.com",
      "sunil@aadhya-analytics.com"
      ],
    "emailNotificationEnabled":"false",
    "createdDate":"1522520474547",
    "createdDateString":"31-03-2018",
    "createdId":"emp0001",
    "createdName":"konark",
    "lastModifiedDate":"1522520474547",
    "lastModifiedDateString":"31-03-2018",
    "lastModifiedId":"emp0001",
    "lastModifiedName":"konark",
    "accountId":"acc1001",
    "status":"1",
    "resourceBundleId":"RSB005",
    "orgId":"001"
  }
  this._calendarService.updateCalendarShift(calendarshiftData).subscribe(
    data => {
      // refresh the list
      this.getCalendarShift();
      //return true;
    },
    error => {
      console.error("Error saving New Calendar!");
     // return Observable.throw(error);
    }
 );
}
//------update Calendar Shift


// ----Get calendar  Shift AdditionalInfo ----//
getCalendarShiftAdditionalInfo() {
    
  this._calendarService.getAdditionalDetailsbycalendarId(this.calendarid).subscribe(
    data =>   this.calendarShiftResult = data);
}
// ----Get calendar  Shift AdditionalInfo ----//

getCalendarByFromDateandToDate()
{
  let calendarshiftData = 
  {
    "calendarid":"5af03f3ff0969f52a0db56e9",
    "fromdt":'2017-10-15',
    "todt":'2017-10-21'
  }
  this._calendarService.getCalendarByFromDateandToDate(calendarshiftData).subscribe(
    data =>   this.calendarShiftResult = data);
}
CalendarColorCodeChange(calendarColorCode : string ) {
  
  console.log(this.calendarid,calendarColorCode);
}
}
  

 

