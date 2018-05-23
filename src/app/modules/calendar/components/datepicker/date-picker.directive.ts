import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appDatePicker]'
})
export class DatePickerDirective implements OnInit {

  datePicker: any;
  inputField: any;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    try {
      this.datePicker = this.el.nativeElement.getElementsByTagName("app-date-picker")[0];
    } catch (err) {
      console.log("Date Picker Component Not Found");
    }
    try {
      this.inputField = this.el.nativeElement.getElementsByTagName("input")[0];
    } catch (err) {
      console.log("Input Field Not Found");
    }
    this.datePicker.style.display = "none";
    let self = this;
    this.inputField.onfocus = function () {
      self.datePicker.style.display = "block";
    };

    this.inputField.addEventListener("focusout", function (e) {
      if([].indexOf.call(self.datePicker.getElementsByClassName("dp"),e.relatedTarget) === -1)
        self.datePicker.style.display = "none";
      else
        self.inputField.focus();
    });

    this.inputField.addEventListener("keyup",function (e) {
      if(self.inputField.value.length > 10) self.inputField.value = self.inputField.value.substring(0,10);
    });
  }

}
