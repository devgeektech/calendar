import { Component, OnInit, OnChanges } from '@angular/core';
import { CookieService, CookieOptionsArgs } from 'angular2-cookie/core';
import { AuthService } from '../../models/Auth/auth.service';
import { EventsService } from '../../models/events/events.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
	private email : string;
	private password : string;
	private loginFail : boolean = false;
	private userData : any;
	//set cookie expiry time
	private cookieOptions: CookieOptionsArgs = {
		expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
	}
	private isForgotPage: boolean = false; 
	private errorMessage: string = ''; 
	private isLogin: boolean = false;
	// @Output() loggedIn = new EventEmitter();
  constructor(
	private _authService: AuthService, 
	public _eventService: EventsService, 
  	private router: Router,
  	private _cookieService: CookieService
  	) { 
  		console.log("in construct ...")
  		console.log(this._authService)
  		console.log(this._eventService)
  		this._eventService.getMessage().subscribe(message => { 
  			if(message.text === 'login') {
  				this.isLogin = true;
  			} else {
  				this.isLogin = false;
  			}
  		});

  }

  ngOnInit() {
  	console.log("in on init")
  	this._authService.isLoginCheck();
      console.log(this._authService.isLogin)
    this.isLogin = this._authService.isLogin
  }
  ngOnChanges(changes) {
  	console.log("in on changes")
  }
    
}
