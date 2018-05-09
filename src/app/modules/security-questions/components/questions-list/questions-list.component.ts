import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../models/Auth/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {

  	private questionsList: any; 
	private questionCount: number = 2;  
	private questionNums: any;
	private question_ids : any = [];
	private questionAns : any = [];
	private answeredAuestionsList : any;
	_ : any = _;
	private errorMessage: string = 'Problem in getting Swcurity Questions';
	private isErrorMessageShow: boolean = false;
	private isDisableQuestion: boolean = false;
	private isLoginPageLink: boolean = false;
  	constructor(
	  	private _authService: AuthService, 
	  	private router: Router,
	  	private activatedRoute: ActivatedRoute
  	) { }

  	ngOnInit() {
  	console.log("in on inti")
  	this.activatedRoute.params.subscribe((params: Params) => {
	    if(params['forgotPassword']) {
	    	this._authService.getSecurityQuestions().subscribe(
		      (questionsRes) => {
		        console.log(questionsRes)
	        	this.isDisableQuestion = true;
		        if(!questionsRes.status.code) {
		        	this.question_ids = questionsRes.question.map(question => {
		        		return question.question_id
		        	});
		        	this.questionsList = {};
		        	questionsRes.question.map(questionData => {
		        		this.questionsList[questionData.question_id] = questionData.question.question_desc;
		        		return;
		        		// return {questionData.question_id : questionData.question.question_desc}
		        	});
		        	this.questionCount = questionsRes.security_count;
		        	// this.questionNums = Array(this.questionCount).fill().map((x,i)=>i);
		        	this.questionNums = _.range(this.questionCount);
		        	console.log(this.questionNums)
		        	console.log(this.questionsList)
		        	console.log(this.question_ids)
		        	this.isErrorMessageShow = false;
		        }else {
		        	console.log("problem in getting questions")
		        	this.isErrorMessageShow = true;
		        }
		      }
		    )
	    }else {
	    	this.isDisableQuestion = false;
		  	this._authService.getAllSecurityQuestions().subscribe(
		      (questionsRes) => {
		        console.log(questionsRes)
		        if(!questionsRes.status.code) {
		        	this.questionsList = questionsRes.data.question;
		        	this.questionCount = questionsRes.security_count;
		        	// this.questionNums = Array(this.questionCount).fill().map((x,i)=>i);
		        	this.questionNums = _.range(this.questionCount);
		        	console.log(this.questionNums)
		        	console.log(this.questionsList)
		        	this.isErrorMessageShow = false;
		        }else {
		        	console.log("problem in getting questions")
		        	this.isErrorMessageShow = true;
		        }
		      }
		    )
	    }
	  });
	  
  	}
  	securityQuestionsSubmit() {
	  	console.log(this.question_ids)
	  	console.log(this.questionAns)
	  	if(this.isDisableQuestion) {
	  		this._authService.validateSecurityQuestions(this.question_ids, this.questionAns).subscribe(
				(seqQuesRes) => {
					console.log(seqQuesRes)
					if(!seqQuesRes.status.code) {
						this._authService.isLogin = false;
						this.router.navigate(['password-reset']);
					}else {
						this.errorMessage = seqQuesRes.status.message;
						this.isErrorMessageShow = true;
					}
				},
				(error) => {
					// this.invalidLogin = true;
					console.log("error in reset")
					this.errorMessage = 'There is some problem in Submitting Security Questions';
					this.isErrorMessageShow = true;
				}
			)
	  	}else {
		  	this._authService.addSecurityQuestions(this.question_ids, this.questionAns).subscribe(
				(seqQuesRes) => {
					console.log(seqQuesRes)
					if(!seqQuesRes.status.code) {
						this._authService.isLogin = false;
						this.isErrorMessageShow = false;
						this.isLoginPageLink = true;
						this.errorMessage = seqQuesRes.status.message;
						// this.router.navigate(['']);
					}else {
						this.errorMessage = seqQuesRes.status.message;
						this.isErrorMessageShow = true;
					}
				},
				(error) => {
					// this.invalidLogin = true;
					console.log("error in reset")
					this.errorMessage = 'There is some problem in Submitting Security Questions';
					this.isErrorMessageShow = true;
				}
			)
	  	}
  	}

}
