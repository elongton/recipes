import { Component, OnInit } from '@angular/core';

// import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.scss']
})
export class MealPlannerComponent implements OnInit {

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  dateArray: Date[];
  // minMode: BsDatepickerViewMode = 'month';
  // bsConfig: Partial<BsDatepickerConfig>;

  constructor() { }

  ngOnInit() {
    // this.bsConfig = Object.assign({}, {
    //   minMode: this.minMode
    // });
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  updateDateRange() {
    this.dateArray = this.getDates(this.bsRangeValue[0], this.bsRangeValue[1])
  }

  // addWeek(date) {
  //   let currentDate = new Date(date);
  //   return currentDate.setDate(currentDate.getDate() + 7);
  // }

  getDates(startDate, endDate) {
    var dates = [],
      addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    let currentDate = startDate
    console.log(currentDate.getDay());
    if (currentDate.getDay() > 0) {
      console.log('not a sunday...adjusting')
      currentDate.setDate(currentDate.getDate() - currentDate.getDay());
    }
    // console.log(currentDate.getDay());
    while (currentDate <= endDate) {
      let endWeekDate = addDays.call(currentDate, 6);
      let sameMonth = currentDate.getMonth() != endWeekDate.getMonth() ? false : true;
      dates.push({ begin: currentDate, end: endWeekDate, sameMonth: sameMonth });
      currentDate = addDays.call(currentDate, 7);
    }
    return dates;
  };

}
