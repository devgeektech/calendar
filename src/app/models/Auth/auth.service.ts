import { Injectable } from '@angular/core';
import { Jsonp, Http, Response, Headers, RequestOptions } from '@angular/http';
import { apiBaseUrlJWT } from '../config/config';
import {CookieService, CookieOptionsArgs } from 'angular2-cookie/core';
import {Observable, Observer} from 'rxjs/Rx';

@Injectable()
export class AuthService {
  isLogin : boolean = false;
  apiBaseUrlJWT : string = apiBaseUrlJWT;
  token : string;
  loginHeaders : Headers;
  cookieOptions : CookieOptionsArgs;
  userData : any;

  constructor(
  		private http : Http,
      private _cookieService:CookieService
  	) { }
  login(username : string, passwd : string) {
  	let loginUrl = this.apiBaseUrlJWT + '/login';
  	let body = {
      email : username,
      password : passwd
    };
  	let headers      = new Headers({ 'Content-Type': 'application/json' }); 
  	let options       = new RequestOptions({ headers: headers }); 

    return this.http.post(loginUrl, body, options) 
      .map((res:Response) => res) 
      .catch((error:any) => Observable.throw(error || 'Server error')); 
  }
  resetPassword(password: string, password_confirmation: string, current_password: string) {
    let loginUrl = this.apiBaseUrlJWT + '/password/reset';
    let body = {
      password, password_confirmation, current_password
    };
    let headers      = new Headers({ 'Content-Type': 'application/json' }); 
    headers.append('Authorization','Bearer '+this.token);
    let options       = new RequestOptions({ headers: headers }); 

    return this.http.post(loginUrl, body, options) 
      .map((res:Response) => res.json()) 
      .catch((error:any) => Observable.throw(error || 'Server error')); 
  }
  isLoginCheck() {
    if(this._cookieService.get("cms-token")) {
      this.isLogin = true;
    }else {
      this.isLogin = false;
    }
  }
  getUsername() {
    return this._cookieService.get("cms-username") ? this._cookieService.get("cms-username") : null
  }
  getToken() {
  	this.token = this._cookieService.get("cms-token") ? this._cookieService.get("cms-token") : null;
  }
  getAllSecurityQuestions() {
    let serverUrl = this.apiBaseUrlJWT + '/security';
    let headers      = new Headers({ 'Content-Type': 'application/json' }); 
    headers.append('Authorization','Bearer '+this.token);
    let options       = new RequestOptions({ headers: headers });
    return this.http.get(serverUrl, options) 
      .map((res:Response) => res.json()) 
      .catch((error:any) => Observable.throw(error || 'Server error')); 
  }
  addSecurityQuestions(security_question: any, answer: any) {
    let serverUrl = this.apiBaseUrlJWT + '/security';
    let body = {
      security_question, answer
    };
    let headers      = new Headers({ 'Content-Type': 'application/json' }); 
    headers.append('Authorization','Bearer '+this.token);
    let options       = new RequestOptions({ headers: headers }); 

    return this.http.post(serverUrl, body, options) 
      .map((res:Response) => res.json()) 
      .catch((error:any) => Observable.throw(error || 'Server error')); 
  }
  getSecurityQuestions() {
    let serverUrl = this.apiBaseUrlJWT + '/security/confirm/' + this.token;
    let headers      = new Headers({ 'Content-Type': 'application/json' }); 
    // headers.append('Authorization','Bearer '+this.token);
    let options       = new RequestOptions({ headers: headers });
    return this.http.get(serverUrl, options) 
      .map((res:Response) => res.json()) 
      .catch((error:any) => Observable.throw(error || 'Server error')); 
  }
  forgotPassword(email: string) {
    let serverUrl = this.apiBaseUrlJWT + '/forgot/password';
    let body = {
      email
    };
    let headers      = new Headers({ 'Content-Type': 'application/json' }); 
    // headers.append('Authorization','Bearer '+this.token);
    let options       = new RequestOptions({ headers: headers }); 

    return this.http.post(serverUrl, body, options) 
      .map((res:Response) => res.json()) 
      .catch((error:any) => Observable.throw(error || 'Server error')); 
  }
  validateSecurityQuestions(security_question: any, answer: any) {
    let serverUrl = this.apiBaseUrlJWT + '/security/confirm';
    let body = {
      security_question, answer, token:this.token
    };
    let headers      = new Headers({ 'Content-Type': 'application/json' }); 
    let options       = new RequestOptions({ headers: headers }); 

    return this.http.post(serverUrl, body, options) 
      .map((res:Response) => res.json()) 
      .catch((error:any) => Observable.throw(error || 'Server error')); 
  }
}
