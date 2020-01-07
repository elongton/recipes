import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({
    providedIn: "root"
})
export class MealPlannerService {
    constructor(
        private store: Store<fromApp.AppState>,
    ) { }
    getDates(startDate, endDate) {
        var dates = [],
            addDays = function (days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
        let currentDate = startDate
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




