import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class UnitService {
    unitTypes$ = new BehaviorSubject<any[]>([]);
    constructor(private http: HttpClient) { }

    getUnits() {
        return this.http.get<any[]>(`api/units/`);
    }
    getUnitTypes() {
        return this.http.get<any[]>(`api/unit-types/`).subscribe(result => {
            this.unitTypes$.next(result)
        });
    }
    createUnit(unit) {
        return this.http.post(`api/units/`, unit);
    }

    deleteUnit(unitId) {
        return this.http.delete(`api/units/${unitId}`).subscribe(result => {
            console.log(result)
        })
    }
}
