import { Component, OnInit,ViewChild } from '@angular/core';
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
  calendar_name = new FormControl('', [
    Validators.required
  ]);
  report_to = new FormControl('', [
  Validators.required
  ]);
  
show:boolean=false;
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

 // let food = {name: name};
    this._calendarService.createNewCalendar(this.calendarForm.value).subscribe(
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
  
 
}