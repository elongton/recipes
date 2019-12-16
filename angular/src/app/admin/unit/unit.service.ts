import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class UnitService {
    constructor(private http: HttpClient) { }

    deleteUnit(unitId) {
        return this.http.delete(`api/units/${unitId}`).subscribe(result => {
            // let currentUnitTypes = this.appService.unitTypes$.getValue();
            // currentUnitTypes.map(unitType => {
            //     unitType.units = unitType.units.filter(unit => { return unit.id !== unitId })
            // })
        })
    }
}
