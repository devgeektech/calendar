import { Component, OnInit,OnChanges, SimpleChanges, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, Form, NgForm } from '@angular/forms';
import { CalendarService } from '../calendar/services/calendar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UiSwitchModule } from 'angular2-ui-switch';
import { forEach } from '@angular/router/src/utils/collection';






@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  
  providers:[CalendarService]
  
})
export class CalendarComponent implements OnInit,OnChanges{
    
  @Input() date: string;
  @Output() dateUpdated = new EventEmitter();

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
shiftid:string="";
 EditCalendarResult:any;
 EditShiftResult:any;
 calendarShow:string = "month";
 listShow:string= "calendar";
 contactShow:string="group";
timeZone:string="";
contactid: any[] = [];
statusCode:number;
  public calendarResult: any;
  public calendarShiftResult:any;
  public SchedulingShiftResult:any;
  private color: string = "#0299e5";
  private status:string="InActive";
  isChecked:boolean=false;
  
  public contactResult:any;
  public groupResult:any;
  todayDisabled:number = 0;
// ======= Calenadar ======= //

months: string[];
days: number[];
year: number;

month: number;
day: number;
selectedYear: number;

selectedMonth: number;
selectedDay: number;
today: Date;

public value:any = [];
public _disabledV:string = '0';
public disabled:boolean = false;
 //public items1:string[];
 public items:any;
 
 calendarReportTo: any[] = [];

  constructor(private formBuilder: FormBuilder,protected router: Router,protected _calendarService:CalendarService) {
      
       
    this.timeZone =Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    this.days = [];
    this.today = new Date();
    this.selectedYear = this.year = this.today.getFullYear();
    this.selectedMonth = this.month = this.today.getMonth();
    this.selectedDay = this.day = this.today.getDate();
    this.setCalendar();
    this.dateUpdated.emit(new Date(this.year, this.month, this.day + 1));
  
   }

  setCalendar(): void {
    this.days = [];
    const firstDay = new Date(this.year, this.month, this.day);
    firstDay.setDate(1);
    const lastDay = new Date(this.year, this.month + 1, 0);
    for (let i = 0; i < firstDay.getDay(); i++) {
      this.days.push(null);
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      this.days.push(i);
    }
    while (this.days.length < 42) {
      this.days.push(null);
    }
  }




  ngOnInit() {
    console.log(this.timeZone);

    this.calendarForm = this.formBuilder.group({
      calendar_name: this.calendar_name,
      report_to: this.report_to
      
    });

    this.shiftForm = this.formBuilder.group({
      shift_name: this.shift_name,
      shift_datetime: this.shift_datetime
      
    });

   

    this.getScheduleCalendar()

    this.getAllGroupByOrgID()
    this.getAllContactByOrgID("")
    this.getAllContactByOrgID1("")
    // this.getCalendarByFromDateandToDate()
   }

   ngOnChanges(changes: SimpleChanges): void {
    const reg = /\d\d\d\d-\d\d-\d\d/g;
    const dt = changes['date'].currentValue;
    if (dt && reg.exec(dt)) {
      try {
        const newDate = new Date(dt);
        if (isNaN(newDate.getTime())) { throw new Error(); }
        this.year = newDate.getFullYear();
        this.month = newDate.getMonth();
        this.select(newDate.getDate());
        this.setCalendar();
      } catch (invalidDateError) {
        this.select(this.day);
        this.setCalendar();
      }
    } else if (dt && dt.length >= 10) {
      const newDate = new Date();
      this.year = newDate.getFullYear();
      this.month = newDate.getMonth();
      this.select(newDate.getDate());
      this.setCalendar();
    }
  }

  nextMonth(): void {
    this.month += 1;
      this.todayDisabled += 1;
    if (this.month === 12) {
      this.month = 0; this.year += 1;
    }
    this.setCalendar();
  }

  prevMonth(): void {
    this.month -= 1;
    this.todayDisabled -= 1;

    if (this.month === -1) {
      this.month = 11; this.year -= 1;
    }
    this.setCalendar();
  }

  nextYear(): void {
    this.year += 1;
    this.setCalendar();
  }

  prevYear(): void {
    this.year -= 1;
    this.setCalendar();
  }

  isSelected(d: number): boolean {
    return this.year === this.selectedYear
      && this.month === this.selectedMonth
      && d === this.selectedDay;
  }

  select(d: number): void {
    this.selectedYear = this.year;
    this.selectedMonth = this.month;
    this.selectedDay = this.day = d;
    this.dateUpdated.emit(new Date(this.year, this.month, this.day + 1));
  }

// ==== calendar ==== //





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
      "emailNotificationList": 
      this.calendarReportTo,
      
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
      this.show=false;
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
      "emailNotificationList": 
        this.calendarReportTo,
    
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
           this.EditCalendarResult="";
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
      let shiftDate = datePipe.transform(splitString[0], "yyyy-MM-dd");
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
          this.getAllShiftList();
          this.shiftid="";
        this.shiftForm.value.shift_name = '';
        this.shiftForm.value.shift_datetime = '';
          
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
  
   EditShift(_id: string)
   {
     console.log("EditShift Id",_id);
     this.shiftid=_id;
     this._calendarService.getSchedulingShift_Shiftid(_id).subscribe(
      data =>  { this.EditShiftResult = data[0]
      console.log("Edit data",this.EditShiftResult)
      });
  }
  
  // ----Update  Shift----//
     public clickModalShiftEdit() 
     {
       console.log("Shiftid",this.shiftid)
       var datePipe = new DatePipe("en-US");
       let sDate = datePipe.transform(this.shiftForm.value.shift_datetime, "short");
       var splitString = sDate.split(',');
       let shiftDate = datePipe.transform(splitString[0], "yyyy-MM-dd");
     let shiftTime=splitString[1];
     console.log(sDate,shiftDate,shiftTime)
   let updateshiftData = 
  {
   // "_id":this.shiftid,
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
  this._calendarService.updateScheduleShift(this.shiftid,updateshiftData).subscribe(
           data => {
            this.getAllShiftList();
          this.shiftid="";
          this.EditShiftResult="";
          
          
           },
           error => {
             console.error("Error saving New Calendar!");
            // return Observable.throw(error);
           }
        );
    }
    // ----Update  Shift----//
  
  
  // ----Delete Scheduling  Shift----//
   DeleteShift(_id: string) {
    console.log(_id);
    this._calendarService.deleteSchedulingShift(_id)
      .subscribe(successCode => {
    //this.statusCode = successCode;
      //Expecting success code 204 from server
    this.statusCode = 204;
    this.getAllShiftList();
    this.show= false;
    
    this.shiftid="";
        this.shiftForm.value.shift_name = '';
        this.shiftForm.value.shift_datetime = '';
          
  
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
  
  //Get All Shift List
  getAllShiftList()
  {
    this._calendarService.getSchedulingShift().subscribe(
      data =>   this.SchedulingShiftResult = data);
        this.listShow="shift";
  }
  
  ClearModel()
  {
    console.log("clear")
    this.calendarid="";
    this.shiftid="";
   this.calendarForm.reset();
    this.EditShiftResult="";
    this.EditCalendarResult="";
  
        
    
  
  }
  CalendarShow()
  {
    this.listShow="calendar";
    
  }
  ContactShow()
  {
    this.contactShow="email";
  }
  // ----Get All Contact BY OrgID----//
getAllContactByOrgID(contactId) {
  let orgId="120";
this._calendarService.getAllContactByOrgID(orgId,contactId).subscribe(
  data =>  this.contactResult = data);
 }
getAllContactByOrgID1(contactId) {
  let orgId="120";

  this._calendarService.getAllContactByOrgID(orgId,contactId)
  .subscribe(data => {
    
   // Array.from(data.Result).forEach(function (child) {
    
    this.items = data.Result.map(a =>a.emailIds.office)
    //var item = data.Result.map(a =>a.emailIds.office)
      
     // this.items.push(item);
    
    
    
    console.log(this.items);
      
     //this.items.push(item);
//  });

    });
  // console.log("Contact List",this.items);

   


}
// ----Get All Contact BY OrgID----//

// ----Get All Contact BY OrgID----//
getAllGroupByOrgID() {
let orgId="120";
this._calendarService.getAllGroupByOrgID(orgId).subscribe(
data =>   this.groupResult = data);
}
// ----Get All Contact BY OrgID----//

onSelect(groupId:string) { 
  let orgId="120";
  //console.log(groupId);
  let groupResultByGroupID:any;
  this._calendarService.getGroupByGroupID(orgId,groupId).subscribe(
    data =>  { groupResultByGroupID = data
    
     console.log("ContactID", data[0].contactIds);
     
     for(var  contactid in  data[0].contactIds)
     {

     this.getAllContactByOrgID(contactid)
     }
    });
  }
  OnCheckedContact(_id :string)
  {
    console.log("Contactid",_id)
  //if(e.target.checked==true)
  //{
    
    this.contactid.push(_id)
  

    console.log("Array contact", this.contactid)

  } 
  
  public get disabledV():string {
    return this._disabledV;
  }

  public set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value:any):void {
    
    console.log('Selected value is: ', value);
    this.calendarReportTo.push(value.text);
    console.log("selected COntact",this.calendarReportTo);
  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);
    var index = this.calendarReportTo.indexOf(value.text);
    console.log("contact index",index)
    this.calendarReportTo.splice(index, 1);
    console.log("list",this.calendarReportTo)
  }

  public refreshValue(value:any):void {
    this.value = value;
  }

  public itemsToString(value:Array<any> = []):string {
    return value
      .map((item:any) => {
        return item.text;
      }).join(',');
  }
currentMonth(){
  const newDate = new Date();
  this.month = newDate.getMonth();
  this.todayDisabled = 0;
  this.setCalendar();

}
ShowCalendarDetails()
{
  this.show=false;
}
  }
  
  
