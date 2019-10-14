import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FilterPipe } from './pipes/filter.pipe'
import {
    fas,
    faArrowLeft,
    faPlus,
    faMinus,
    faTimes,
    faEdit
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    declarations: [
        FilterPipe
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule,
    ],
    exports: [
        FilterPipe,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
    ]
})
export class SharedModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas);
        library.addIcons(
            faArrowLeft,
            faPlus,
            faMinus,
            faTimes,
            faEdit);
    }

}
