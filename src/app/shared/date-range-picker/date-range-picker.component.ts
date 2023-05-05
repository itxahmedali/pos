import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent {
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  maxDate: NgbDate;
  @Output() dateRangeSelected: EventEmitter<{fromDate: string, toDate: string}> = new EventEmitter<{fromDate: string, toDate: string}>();

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private route: ActivatedRoute) {
    const today = calendar.getToday();
    this.maxDate = today;
    this.fromDate = calendar.getPrev(today, 'd', 7);
    if (this.route?.snapshot?.routeConfig?.path === 'createDiscount') {
      this.toDate = null;
    }
    else {
      this.toDate = today;
    }
  }

  ngOnInit(): void {
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if (this.fromDate && this.toDate) {
      this.dateRangeSelected.emit({fromDate: this.formatter.format(this.fromDate), toDate: this.formatter.format(this.toDate)});
    }
  }
  isDisabled(date: NgbDate) {
    const today = this.calendar.getToday();
    return date.after(today);
  }
  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}
