import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { CookieService, CookieOptionsArgs } from 'angular2-cookie/core';
import { AuthService } from '../../models/Auth/auth.service';
import { EventsService } from '../../models/events/events.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private email: string;
    private password: string;
    private loginFail: boolean = false;
    private userData: any;
    //set cookie expiry time
    private cookieOptions: CookieOptionsArgs = {
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    }
    private isForgotPage: boolean = false;
    private errorMessage: string = '';
    @Output() loggedIn = new EventEmitter();
    constructor(
        private _authService: AuthService,
        private _eventService: EventsService,
        private router: Router,
        private _cookieService: CookieService,
        private ngZone: NgZone,
    ) { }

    ngOnInit() {
    }
    login() {
        this._authService.login(this.email, this.password).subscribe(
            (loginResponse) => {
                let loginRes = loginResponse.json();
                console.log("loginResponse");
                localStorage.clear();
                console.log(loginResponse)
                let resHeaders = loginResponse.headers;
                if (!loginRes.status.code) {
                    this.userData = loginRes.data;
                    console.log(loginRes)
                    console.log(this.userData)
                    this._authService.userData = this.userData;
                    console.log(resHeaders)
                    console.log(resHeaders.get('Authorization'))
                    //this._authService.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly81Mi4zMi4yNTMuMTkxL2Ntc2FwaV9qd3QvcHVibGljL2FwaS9sb2dpbiIsImlhdCI6MTUxNjg1ODUzOCwiZXhwIjoxNTE2ODYyMTM4LCJuYmYiOjE1MTY4NTg1MzgsImp0aSI6Ijh6a2lsMHUwQzBLMWlVanMifQ.AchLPJvExJFxoA_u7Tt_9uEy3zpMOgauENzH2bbrxNQ';
                    let name = loginRes.data.firstname + " " + loginRes.data.middlename + " " + loginRes.data.lastname
                    this._authService.token = loginRes.authorization.token;
                    this._cookieService.put("cms-token", this._authService.token, this.cookieOptions);
                    this._cookieService.put("cms-username", loginRes.data.username, this.cookieOptions);
                    this._cookieService.put("cms-orgId", loginRes.data.org_id, this.cookieOptions);
                    this._cookieService.put("cms-latitude", loginRes.data.latitude, this.cookieOptions);
                    this._cookieService.put("cms-longitude", loginRes.data.longitude, this.cookieOptions);
                    this._cookieService.put("cms-name", name, this.cookieOptions);
                    this.loginFail = false;
                    if (!this.userData.reset_p_status) {
                        // code to go to password reset page
                        this.router.navigate(['password-reset']);
                    } else if (!this.userData.security_status) {
                        //code to go yo add security questions page
                        this.router.navigate(['security-questions']);
                    } else {
                        //code to go to user specific default page
                        this.loggedIn.emit(true);
                        this._authService.isLogin = true;
                        // this._eventService.publish({})
                        this._eventService.sendMessage('login')
                        this.ngZone.run(() => {
                            this.router.navigate(['/calendar']);
                        })
                    }
                } else {
                    this.loginFail = true;
                    this.errorMessage = "Problem in login";
                }
                console.log(loginRes)
            },
            (error) => {
                // this.invalidLogin = true;
                console.log("error in logind")
                this.errorMessage = "Problem in login";
            }
        )
    }
    gotoForgotPassword() {
        this.isForgotPage = true;
    }
    gotoLogin() {
        this.isForgotPage = false;
    }
    forgotPassword() {
        this._authService.forgotPassword(this.email).subscribe(
            (forgotRes) => {
                if (!forgotRes.status.code) {
                    this._authService.token = forgotRes.session.token;
                    this.loginFail = false;
                    console.log(this._authService.token)
                    this.router.navigate(['security-questions/forgot-password']);
                } else {
                    this.loginFail = true;
                    this.errorMessage = "Problem in sending password to mail";
                }
                console.log(forgotRes)
            },
            (error) => {
                this.errorMessage = "Problem in sending password to mail";
                // this.invalidLogin = true;
                console.log("error in logind")
            }
        )
        // 
    }
}
