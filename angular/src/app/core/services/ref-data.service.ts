import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RefDataService {
    lookup$ = new BehaviorSubject<any>([]);

    constructor(private http: HttpClient) {
        this.http.get('api/ref/').subscribe(data => {
            this.lookup$.next(data);
        });
    }

    get(fieldName: string) {
        let filteredData = this.lookup$.value.filter(item => item['reference_type'] === fieldName)
        let refObject = {}
        filteredData.forEach(row => {
            refObject[row.key] = row.value
        })
        return { refObject: refObject, refArray: filteredData }
    }

}