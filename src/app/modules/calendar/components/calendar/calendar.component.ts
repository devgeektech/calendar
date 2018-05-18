import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, Form, NgForm } from '@angular/forms';
import { CalendarService } from '../calendar/services/calendar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers:[CalendarService,FormBuilder],
})
export class CalendarComponent implements OnInit {
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
  public calendarResult: any;
  public calendarShiftResult:any;
  private color: string = "#0299e5";

  constructor(protected formBuilder: FormBuilder,protected router: Router,protected _calendarService:CalendarService) { }

  ngOnInit() {
    
    this.calendarForm = this.formBuilder.group({
      calendar_name: this.calendar_name,
      report_to: this.report_to
      
    });

    this.shiftForm = this.formBuilder.group({
      shift_name: this.shift_name,
      shift_datetime: this.shift_datetime
      
    });

   

    this.getScheduleCalendar()
    // this.getCalendarByFromDateandToDate()
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
  }
  
