import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../models/Auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  	private password : string;
	private password_confirmation : string;
	private current_password : string;
	private userData: any;
  	constructor(
  		private _authService: AuthService, 
  		private router: Router
  	) { }

  	ngOnInit() {
  	}
  	resetPasswordSubmit() {
	  	this._authService.resetPassword(this.password, this.password_confirmation, this.current_password).subscribe(
			(resetPassRes) => {
				console.log(resetPassRes)
				if(!resetPassRes.status.code) {
					this.userData = this._authService.userData;
					if(!this.userData.security_status) {
						//code to go yo add security questions page
						this.router.navigate(['security-questions']);
					}else {
						//code to go to user specific default page
						this._authService.isLogin = true;
						this.router.navigate(['message-template']);
					}
				}
			},
			(error) => {
				// this.invalidLogin = true;
				console.log("error in reset")
			}
		)
  	}

}
