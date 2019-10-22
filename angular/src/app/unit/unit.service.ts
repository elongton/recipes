import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

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
            console.log(result)
            this.unitTypes$.next(result)
        });
    }
    createUnit(unit) {
        return this.http.post(`api/units/`, unit).pipe(tap(result => {
            let currentUnitTypes = this.unitTypes$.getValue();
            currentUnitTypes.map(unitType => {
                if (unitType.id === unit.unit_type) {
                    unitType.units.push(result)
                }
            })
            console.log(currentUnitTypes)
            this.unitTypes$.next(currentUnitTypes)
        }));
    }

    deleteUnit(unitId) {
        return this.http.delete(`api/units/${unitId}`).subscribe(result => {
            let currentUnitTypes = this.unitTypes$.getValue();
            currentUnitTypes.map(unitType => {
                unitType.units = unitType.units.filter(unit => { return unit.id !== unitId })
            })
        })
    }
}
