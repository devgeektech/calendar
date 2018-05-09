import { Component, OnInit } from '@angular/core';
import { CookieService, CookieOptionsArgs } from 'angular2-cookie/core';
import { AuthService } from '../../../../models/Auth/auth.service';
import { EventsService } from '../../../../models/events/events.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    private cookieOptions: CookieOptionsArgs = {
		expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
	}
    constructor(
      private _authService: AuthService, 
	  	private _eventService: EventsService, 
	  	private router: Router,
	  	private _cookieService: CookieService
  	) { }

    ngOnInit() {
      this._authService.isLoginCheck();
      console.log(this._authService.isLogin)
      if(this._authService.isLogin) {
        console.log("logged in ")
      } else {
        console.log("not logged in")
      }
  		console.log("header component calling ...")
  		// this.isLogin = this._authService.isLogin;
    }
    logoutUser() {
  		this._authService.isLogin = false;
  		this._authService.token = null;
      this._cookieService.remove("cms-token", this.cookieOptions);
      this._cookieService.remove("cms-username", this.cookieOptions);
      this._cookieService.remove("cms-orgId", this.cookieOptions);
      this._eventService.sendMessage('logout')
      this.router.navigate(['']);
    }

}
