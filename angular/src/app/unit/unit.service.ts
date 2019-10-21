import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class UnitService {
    constructor(private http: HttpClient) { }

    getUnits() {
        return this.http.get<any[]>(`api/units/`);
    }
    getUnitTypes() {
        return this.http.get<any[]>(`api/unit-types/`);
    }
}
