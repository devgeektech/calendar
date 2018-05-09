import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-left-sidebar',
    templateUrl: './left-sidebar.component.html',
    styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
    private orgFunctionsList;
    private id: any;
   
    constructor() { }

    ngOnInit() {
    }
    
}
