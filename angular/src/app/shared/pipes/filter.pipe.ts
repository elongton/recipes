import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'filterObjectArray' })
export class FilterPipe implements PipeTransform {
    transform(value: any, property: string, propertyValue: string): any {
        return value.filter(item => item[property] === propertyValue);
    }
}


//used in recipe-edit.component.html
