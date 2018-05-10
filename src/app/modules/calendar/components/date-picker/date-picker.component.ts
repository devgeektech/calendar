import {Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit, OnChanges {
  @Input() date: string;
  @Output() dateUpdated = new EventEmitter();
  months: string[];

  days: number[];
  year: number;

  month: number;
  day: number;
  selectedYear: number;

  selectedMonth: number;
  selectedDay: number;
  today: Date;

  constructor() {
    this.months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    this.days = [];
    this.today = new Date();
    this.selectedYear = this.year = this.today.getFullYear();
    this.selectedMonth = this.month = this.today.getMonth();
    this.selectedDay = this.day = this.today.getDate();
    this.setCalendar();
    this.dateUpdated.emit(new Date(this.year, this.month, this.day + 1));
  }

  ngOnInit() {
  }

  setCalendar(): void {
    this.days = [];
    const firstDay = new Date(this.year, this.month, this.day);
    firstDay.setDate(1);
    const lastDay = new Date(this.year, this.month + 1, 0);
    for (let i = 0; i < firstDay.getDay(); i++) {
      this.days.push(null);
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      this.days.push(i);
    }
    while (this.days.length < 42) {
      this.days.push(null);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const reg = /\d\d\d\d-\d\d-\d\d/g;
    const dt = changes['date'].currentValue;
    if (dt && reg.exec(dt)) {
      try {
        const newDate = new Date(dt);
        if (isNaN(newDate.getTime())) { throw new Error(); }
        this.year = newDate.getFullYear();
        this.month = newDate.getMonth();
        this.select(newDate.getDate());
        this.setCalendar();
      } catch (invalidDateError) {
        this.select(this.day);
        this.setCalendar();
      }
    } else if (dt && dt.length >= 10) {
      const newDate = new Date();
      this.year = newDate.getFullYear();
      this.month = newDate.getMonth();
      this.select(newDate.getDate());
      this.setCalendar();
    }
  }

  nextMonth(): void {
    this.month += 1;
    if (this.month === 12) {
      this.month = 0; this.year += 1;
    }
    this.setCalendar();
  }

  prevMonth(): void {
    this.month -= 1;
    if (this.month === -1) {
      this.month = 11; this.year -= 1;
    }
    this.setCalendar();
  }

  nextYear(): void {
    this.year += 1;
    this.setCalendar();
  }

  prevYear(): void {
    this.year -= 1;
    this.setCalendar();
  }

  isSelected(d: number): boolean {
    return this.year === this.selectedYear
      && this.month === this.selectedMonth
      && d === this.selectedDay;
  }

  select(d: number): void {
    this.selectedYear = this.year;
    this.selectedMonth = this.month;
    this.selectedDay = this.day = d;
    this.dateUpdated.emit(new Date(this.year, this.month, this.day + 1));
  }

}
