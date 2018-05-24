import { Injectable } from '@angular/core';
import { Jsonp, Http, Response, Headers, RequestOptions } from '@angular/http';
import { apiBaseUrlServer } from '../../../../../models/config/config';
import { apiBaseUrlServer1 } from '../../../../../models/config/config';

import {CookieService, CookieOptionsArgs } from 'angular2-cookie/core';
import {Observable, Observer } from 'rxjs/Rx';
import 'rxjs/add/observable/of';






@Injectable()


export class CalendarService {
  apiBaseUrlServer : string = apiBaseUrlServer;
  apiBaseUrlServer1:string=apiBaseUrlServer1;
  constructor(
    private http : Http,
    private _cookieService:CookieService
  ) { }
//------Calendar Service-----//
  getSchedulingCalendar()  {
    
    let serverUrl = apiBaseUrlServer + '/scheduling/calendar/';
    let headers= new Headers({ 'Content-Type': 'application/json' });
    let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
    
    headers.append('Authorization',' '+token);
    
     let options = new RequestOptions({ headers: headers });
    
    
    return this.http.get(serverUrl,options) 
      .map((res:Response) => res.json()) 
      .catch((error:any) => Observable.throw(error || 'Server error'));
     
  
}
  createNewCalendar(calendar) {
    let serverUrl = apiBaseUrlServer + '/scheduling/calendar/';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
    
    headers.append('Authorization',' '+token);
    
   let options = new RequestOptions({ headers: headers });
    
    let body = calendar;
    return this.http.post(serverUrl, body, options ).map((res: Response) => res.json());
  }

  getSchedulingCalendarByCalendarID(calendarid)  {
    let serverUrl = apiBaseUrlServer + '/scheduling/calendar/' + calendarid;
   
    let headers= new Headers({ 'Content-Type': 'application/json' });
    let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
    
    headers.append('Authorization',' '+token);
    let options = new RequestOptions({ headers: headers });
    
    
    return this.http.get(serverUrl,options) 
      .map((res:Response) => res.json()) 
      .catch((error:any) => Observable.throw(error || 'Server error'));
     
  
}
  updateCalendar(id,calendar) {
    console.log("Api Edit Id",id)
    let serverUrl = apiBaseUrlServer + '/scheduling/calendar/' + id;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
    
    headers.append('Authorization',' '+token);
    
   let options = new RequestOptions({ headers: headers });
    
    let body = calendar;
    

    return this.http.put(serverUrl, body, options ).map((res: Response) => res.json());
  }
  
  deleteCalendar(calendarid){
  let serverUrl = apiBaseUrlServer + '/scheduling/calendar/';
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
  headers.append('Authorization',' '+token);
  let data = {
    "calendarIds":[
		calendarid
	]}
  let options = new RequestOptions({ headers: headers,body:data });
	return this.http.delete(serverUrl,options)
	       .map(success => success.status)
               .catch(this.handleError);

  }
  updateCalendarStatus(id,status) {
    console.log("Api Edit Id",id)
    let serverUrl = apiBaseUrlServer + '/scheduling/calendar/' + id + '/active';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
    
    headers.append('Authorization',' '+token);
    
   let options = new RequestOptions({ headers: headers });
    
    let body = status;
    

    return this.http.put(serverUrl, body, options ).map((res: Response) => res.json());
  }
//--------Calendar Service-------



//--------Scheduling Shift Service-------

//----Get Scheduling All Shift  get all shifts (schedules) -------// 
getSchedulingShift()  {
  let serverUrl = apiBaseUrlServer + '/scheduling/shifts';
  let headers= new Headers({ 'Content-Type': 'application/json' });
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
  headers.append('Authorization',' '+token);
  let options = new RequestOptions({ headers: headers });
  return this.http.get(serverUrl,options) 
    .map((res:Response) => res.json()) 
    .catch((error:any) => Observable.throw(error || 'Server error'));
   }
//-----Get Calendar All Shift-------// 



//------Create Scheduling Shift-------//
createNewShift(shift) {
  let serverUrl = apiBaseUrlServer + '/scheduling/shift';
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
  
  headers.append('Authorization',' '+token);
  
 let options = new RequestOptions({ headers: headers });
  
  let body = shift;
  return this.http.post(serverUrl, body, options ).map((res: Response) => res.json());
}
//------Create Scheduling Shift-------//

//----Get Scheduling All Shift get a schedule by scheduleId-------// 
getSchedulingShift_Shiftid(shiftid)  {
  let serverUrl = apiBaseUrlServer + '/scheduling/shift/' + shiftid;
  let headers= new Headers({ 'Content-Type': 'application/json' });
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
  headers.append('Authorization',' '+token);
  let options = new RequestOptions({ headers: headers });
  return this.http.get(serverUrl,options) 
    .map((res:Response) => res.json()) 
    .catch((error:any) => Observable.throw(error || 'Server error'));
   }
//-----Get Scheduling Shift-------// 


//------Update scheduling Shift-------//
updateSchedulingShift(shift) {
  
  let serverUrl = apiBaseUrlServer + '/scheduling/shift';
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
  
  headers.append('Authorization',' '+token);
  
 let options = new RequestOptions({ headers: headers });
  
  let body = shift;
  

  return this.http.put(serverUrl, body, options ).map((res: Response) => res.json());
}

//------Update scheduling Shift-------//
updateScheduleShift(shiftid,shift) {
  
  let serverUrl = apiBaseUrlServer + '/scheduling/shift/'+shiftid;
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
  
  headers.append('Authorization',' '+token);
  
 let options = new RequestOptions({ headers: headers });
  //let body={
  //  "name": "test meeting calendar 4 Edit",
   // "details": null,
   // "staffing": [
    //    "EMP004",
     //   "EMP001",
     //   "EMP008",
     //   "EMP009",
      //  "EMP010"
   // ],
   // "mandatory": [
   //     "1",
   //     "2"
   // ],
   // "m_accepted": [
    //    "1"
   // "start_date": "2018-05-15T00:00:00.000Z",
   // "start_time": "16:00",
    //"end_date": "2018-05-15T00:00:00.000Z",
   // "end_time": "17:00",
    //"recurrence": true,
    //"recType": "daily",
    //"every": "1",
   // "on": {
    //    "days": null,
    //    "date": null,
     //   "order": null,
     //   "month": null
   // },
   // "endRec": {
     //   "occurance": null,
     //   "endbyDate": "2018-08-30T00:00:00.000Z"
    //},
    //"endRecDate": "2018-08-30T00:00:00.000Z",
    //"active": true

//}
  let body = shift;
  

  return this.http.put(serverUrl, body, options ).map((res: Response) => res.json());
}
//------Update Schedule Shift-------//


//------Delete Scheduling Shift-------//

deleteSchedulingShift(_id){
  let serverUrl = apiBaseUrlServer + '/scheduling/shift';
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
  headers.append('Authorization',' '+token);

    let data ={
      "scheduleId":_id
   }

  let options = new RequestOptions({ headers: headers,body:data });
	return this.http.delete(serverUrl,options)
	       .map(success => success.status)
               .catch(this.handleError);

  }


//--------Scheduling Shift Service-------


//--------Scheduling calendar Shift Service-------
//----Get Scheduling getScheduling_Calendar_Shift All Shift -------// 
getCalendarShift(calendarid)  {
  
  let serverUrl = apiBaseUrlServer + '/scheduling/calendar/' + calendarid + '/shifts';
  let headers= new Headers({ 'Content-Type': 'application/json' });
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
  headers.append('Authorization',' '+token);
  let options = new RequestOptions({ headers: headers });
  return this.http.get(serverUrl,options) 
    .map((res:Response) => res.json()) 
    .catch((error:any) => Observable.throw(error || 'Server error'));
   }
//-----Get Calendar All Shift-------//

//------add a schedule to calendar   Create Calendar Shift-------//
createNewCalendarShift(calendarid,shift) {
  console.log(shift);
  let serverUrl = apiBaseUrlServer + '/scheduling/calendar/' + calendarid + '/shift';
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
  
  headers.append('Authorization',' '+token);
  
 let options = new RequestOptions({ headers: headers });
  
  let body = shift;
  return this.http.post(serverUrl, body, options ).map((res: Response) => res.json());
}
//------Create Calendar Shift-------//



//------Update calendar Shift-------//
updateCalendarShift(shift) {
  
  let serverUrl = apiBaseUrlServer + '/scheduling/calendar/' + shift.calendarid + '/shift';
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
  
  headers.append('Authorization',' '+token);
  
 let options = new RequestOptions({ headers: headers });
  
  let body = shift;
  

  return this.http.put(serverUrl, body, options ).map((res: Response) => res.json());
}

//----Update Calendar Shift-------



//------Delete Calendar Shift     remove a schedule from a calendar-------//
deleteCalendarShift(shift){
  let serverUrl = apiBaseUrlServer + '/scheduling/calendar/' + shift.calendarid + '/shift';
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
  headers.append('Authorization',' '+token);
  let data ={
        "schedules":"New001"
  }
  
  let options = new RequestOptions({ headers: headers,body:data });
	return this.http.delete(serverUrl,options)
	       .map(success => success.status)
               .catch(this.handleError);

  }
//--------Scheduling calendar Shift Service-------



//-------- calendar Shift Service-------




  //----get Additional Details by calendarId    /calendar/{calendarId}/shift/additionalInfo -------// 
  getAdditionalDetailsbycalendarId(calendarid)  {
  
  let serverUrl = apiBaseUrlServer + '/calendar/shift/' + calendarid + '/additionalInfo';
  let headers= new Headers({ 'Content-Type': 'application/json' });
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
  headers.append('Authorization',' '+token);
  let options = new RequestOptions({ headers: headers });
  return this.http.get(serverUrl,options) 
    .map((res:Response) => res.json()) 
    .catch((error:any) => Observable.throw(error || 'Server error'));
   }
//-----Get Calendar All Shift-------//


//---------getCalendarByOrgID-------------------

getCalendarByOrgID(orgid)  {
  
  let serverUrl = apiBaseUrlServer + '/scheduling/calendars/' + '001';
  let headers= new Headers({ 'Content-Type': 'application/json' });
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
  headers.append('Authorization',' '+token);
  let options = new RequestOptions({ headers: headers });
  return this.http.get(serverUrl,options) 
    .map((res:Response) => res.json()) 
    .catch((error:any) => Observable.throw(error || 'Server error'));
   }
//---------getCalendarByOrgID-------------------


//---------get schedules by calendarId-------------------

getSchedulesByCalendarID(calendarid)  {
  
  let serverUrl = apiBaseUrlServer + '/scheduling/calendar/' +calendarid +'/shifts';
  let headers= new Headers({ 'Content-Type': 'application/json' });
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
  headers.append('Authorization',' '+token);
  let options = new RequestOptions({ headers: headers });
  return this.http.get(serverUrl,options) 
    .map((res:Response) => res.json()) 
    .catch((error:any) => Observable.throw(error || 'Server error'));
   }
//---------getCalendarByOrgID-------------------


//------------calculate all dates of a schedule   GET get all dates of a schedule----

getAllDatesOfSchedules(calendarid)  {
  
  let serverUrl = apiBaseUrlServer + '/calculate/' +calendarid ;
  let headers= new Headers({ 'Content-Type': 'application/json' });
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
  headers.append('Authorization',' '+token);
  let options = new RequestOptions({ headers: headers });
  return this.http.get(serverUrl,options) 
    .map((res:Response) => res.json()) 
    .catch((error:any) => Observable.throw(error || 'Server error'));
   }
//------------calculate all dates of a schedule   GET get all dates of a schedule--



//------add a schedule to calendar   Create  Staff-------//
createStaff(staff) {
  let serverUrl = apiBaseUrlServer + '/scheduling/calendar/' + staff.shiftid + '/shift/addStaff';
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
  
  headers.append('Authorization',' '+token);
  
 let options = new RequestOptions({ headers: headers });
  
// body={"staffId":["EMP001"]}
  let body = staff;
  return this.http.post(serverUrl, body, options ).map((res: Response) => res.json());
}
//------add a schedule to calendar   Create  Staff-------//


//-----------get staff assigned to a schedule or Shift.-------------------
getStaffAssignedToSchedule(shiftid)  {
  
  let serverUrl = apiBaseUrlServer + '/scheduling/calendar/shift/' +shiftid + '/staff';
  let headers= new Headers({ 'Content-Type': 'application/json' });
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
  headers.append('Authorization',' '+token);
  let options = new RequestOptions({ headers: headers });
  return this.http.get(serverUrl,options) 
    .map((res:Response) => res.json()) 
    .catch((error:any) => Observable.throw(error || 'Server error'));
   }
//------------calculate all dates of a schedule   GET get all dates of a schedule--


//--------GET all shifts (schedules) for a staffId
getAllShiftsOrSchedulesByStaffid(staffId) 
 {
  
  let serverUrl = apiBaseUrlServer + '/scheduling/calendar/shifts/staff/' +staffId + '/staffassignment';
  let headers= new Headers({ 'Content-Type': 'application/json' });
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
  headers.append('Authorization',' '+token);
  let options = new RequestOptions({ headers: headers });
  return this.http.get(serverUrl,options) 
    .map((res:Response) => res.json()) 
    .catch((error:any) => Observable.throw(error || 'Server error'));
   }
//--------GET all shifts (schedules) for a staffId


//GET provides staffIds for a calendar for time range (this week)
getCalendarByFromDateandToDate(staff) 
 {  
   console.log(staff.calendarid,staff.fromdt,staff.todt)
   let serverUrl = apiBaseUrlServer + '/scheduling/calendar/' +staff.calendarid + '/shift/staff';
  let headers= new Headers({ 'Content-Type': 'application/json' });
  let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
  headers.append('Authorization',' '+token);

  let myParams = new URLSearchParams();
    myParams.append('fromdt', staff.fromdt);	
    myParams.append('todt', staff.todt);
   // myParams.append('fromdt','2017-10-15');	
   // myParams.append('todt','2017-10-21');	
   	
   

  let options = new RequestOptions({ headers: headers,params: myParams });
  return this.http.get(serverUrl,options) 
    .map((res:Response) => res.json()) 
    .catch((error:any) => Observable.throw(error || 'Server error'));
   }

//---------getContactByOrgID-------------------

getAllContactByOrgID(orgid,contactsid)  {
  console.log("contactids",contactsid)

  let serverUrl = apiBaseUrlServer1 + '/contacts/' + orgid +'/' + contactsid;
  let headers= new Headers({ 'Content-Type': 'application/json' });
  let token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI1OSwiaXNzIjoiaHR0cDovLzUyLjMyLjI1My4xOTEvY21zYXBpX2p3dC9wdWJsaWMvYXBpL2xvZ2luIiwiaWF0IjoxNTI2OTc4MDk1LCJleHAiOjQ4MTUyNjk3ODA5NSwibmJmIjoxNTI2OTc4MDk1LCJqdGkiOiJRWloyNngzRnNSQXh6QWtaIn0.j4nVIVq1twGJyjES4BEaF2StJbS5yPslFDAn0D40RZ8';
  headers.append('Authorization',' '+token);
  let options = new RequestOptions({ headers: headers });
  return this.http.get(serverUrl,options) 
    .map((res:Response) => res.json()) 
    .catch((error:any) => Observable.throw(error || 'Server error'));
   }
//---------getContactByOrgID-------------------


 //---------getGroupByOrgID-------------------

 getAllGroupByOrgID(orgid)  {

  let serverUrl = apiBaseUrlServer1 + '/groups/' + orgid;
  let headers= new Headers({ 'Content-Type': 'application/json' });
  let token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI1OSwiaXNzIjoiaHR0cDovLzUyLjMyLjI1My4xOTEvY21zYXBpX2p3dC9wdWJsaWMvYXBpL2xvZ2luIiwiaWF0IjoxNTI2OTc4MDk1LCJleHAiOjQ4MTUyNjk3ODA5NSwibmJmIjoxNTI2OTc4MDk1LCJqdGkiOiJRWloyNngzRnNSQXh6QWtaIn0.j4nVIVq1twGJyjES4BEaF2StJbS5yPslFDAn0D40RZ8';
  headers.append('Authorization',' '+token);
  let options = new RequestOptions({ headers: headers });
  return this.http.get(serverUrl,options) 
    .map((res:Response) => res.json()) 
    .catch((error:any) => Observable.throw(error || 'Server error'));
   }
//---------getContactByOrgID-------------------


//---------getGroupByOrgID-------------------

getGroupByGroupID(orgid,groupid)  {

  let serverUrl = apiBaseUrlServer1 + '/groups/' + orgid +'/' +groupid;
  let headers= new Headers({ 'Content-Type': 'application/json' });
  let token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI1OSwiaXNzIjoiaHR0cDovLzUyLjMyLjI1My4xOTEvY21zYXBpX2p3dC9wdWJsaWMvYXBpL2xvZ2luIiwiaWF0IjoxNTI2OTc4MDk1LCJleHAiOjQ4MTUyNjk3ODA5NSwibmJmIjoxNTI2OTc4MDk1LCJqdGkiOiJRWloyNngzRnNSQXh6QWtaIn0.j4nVIVq1twGJyjES4BEaF2StJbS5yPslFDAn0D40RZ8';
  headers.append('Authorization',' '+token);
  let options = new RequestOptions({ headers: headers });
  return this.http.get(serverUrl,options) 
    .map((res:Response) => res.json()) 
    .catch((error:any) => Observable.throw(error || 'Server error'));
   }
//---------getContactByOrgID-------------------








  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
      }
}


