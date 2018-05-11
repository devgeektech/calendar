import { Injectable } from '@angular/core';
import { Jsonp, Http, Response, Headers, RequestOptions } from '@angular/http';
import { apiBaseUrlServer } from '../../models/config/config';
import {CookieService, CookieOptionsArgs } from 'angular2-cookie/core';
import {Observable, Observer } from 'rxjs/Rx';
import 'rxjs/add/observable/of';




import { calendarscheduler } from './calendar_scheduler';


@Injectable()


export class CalendarService {
  apiBaseUrlServer : string = apiBaseUrlServer;

  constructor(
    private http : Http,
    private _cookieService:CookieService
  ) { }

  getSchedulingCalendar()  {
    let serverUrl = apiBaseUrlServer + '/scheduling/calendar/';
   
    let headers= new Headers({ 'Content-Type': 'application/json' });
    let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
    
    headers.append('Authorization',' '+token);
    
     let options = new RequestOptions({ headers: headers });
    
    
    return this.http.get(serverUrl,options) 
      .map((res:Response) => res.json()) 
      .catch((error:any) => Observable.throw(error || 'Server error'));
     
  //return Observable.of(calendarscheduler);
}
  createNewCalendar(calendar) {
    let serverUrl = apiBaseUrlServer + '/scheduling/calendar/';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NWE1NThkYmNjMDcwNTJhOTgzMjkwNiIsImlhdCI6MTUyNjAyMDU4MSwiZXhwIjoxNTI4NjEyNTgxfQ._IsAwWCUu3wbl3jiX05VnC2qGE1AEHyAWk221dMYUeA'
    
    headers.append('Authorization',' '+token);
    
   let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(calendar);
    return this.http.post(serverUrl, body, options ).map((res: Response) => res.json());
  }
  
}
