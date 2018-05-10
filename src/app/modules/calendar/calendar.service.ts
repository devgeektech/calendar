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
   // let serverUrl =  'http://35.164.120.53:3000/scheduling/calendar/';
//let headers = new Headers({ 'Access-Control-Allow-Origin': 'true' });
   
  // headers.append('Access-Control-Allow-Credentials', 'true');
   
 // headers.append('Access-Control-Allow-Headers', 'Content-Type');
  //headers.append('Access-Control-Allow-Methods', 'GET');
  
 // headers.append('origins', '*');

 // headers.append('Access-Control-Allow-Origin', '*');

   // let headers      = new Headers({ 'Content-Type': 'application/json' }); 
     //let options = new RequestOptions({ headers: headers });
    
    //let options       = new RequestOptions({ headers: headers });
    //return this.http.get(serverUrl,options) 
      //.map((res:Response) => res.json()) 
      //.catch((error:any) => Observable.throw(error || 'Server error'));

     
     // return this.http.get('./calendar_scheduler_Json') 
      //.map((res:Response) => res.json()) 
     // .catch((error:any) => Observable.throw(error || 'Server error'));

      //return this.http.get('./calendar_scheduler.json').map((res:Response) => res.json());
     
      return Observable.of(calendarscheduler);
 



      
  }
}
