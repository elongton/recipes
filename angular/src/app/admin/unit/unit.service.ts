import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs/operators';
import { AppService } from '../../app.service';

@Injectable({
    providedIn: "root"
})
export class UnitService {
    constructor(private http: HttpClient, private appService: AppService) { }

    getUnits() {
        return this.http.get<any[]>(`api/units/`);
    }
    getUnitTypes() {
        return this.http.get<any[]>(`api/unit-types/`).subscribe(result => {
            console.log(result)
            // this.appService.unitTypes$.next(result)
        });
    }
    createUnit(unit) {
        return this.http.post(`api/units/`, unit).pipe(tap(result => {
            // let currentUnitTypes = this.appService.unitTypes$.getValue();
            // currentUnitTypes.map(unitType => {
            //     if (unitType.id === unit.unit_type) {
            //         unitType.units.push(result)
            //     }
            // })
            // console.log(currentUnitTypes)
            // this.appService.unitTypes$.next(currentUnitTypes)
        }));
    }

    createUnitType(newUnitType) {
        return this.http.post(`api/unit-types/create`, newUnitType).pipe(tap(result => {
            console.log(result)
            // let currentUnitTypes = this.appService.unitTypes$.getValue();
            // currentUnitTypes.push(result)
            // this.appService.unitTypes$.next(currentUnitTypes)
        }));
    }

    deleteUnit(unitId) {
        return this.http.delete(`api/units/${unitId}`).subscribe(result => {
            // let currentUnitTypes = this.appService.unitTypes$.getValue();
            // currentUnitTypes.map(unitType => {
            //     unitType.units = unitType.units.filter(unit => { return unit.id !== unitId })
            // })
        })
    }
}
