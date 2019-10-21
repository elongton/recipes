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
    faEdit,
    faList,
    faPrint,
    faBars,
} from '@fortawesome/free-solid-svg-icons';
import { FilterPillComponent } from './components/filter-pill/filter-pill.component';
import { PopoverComponent } from './components/popover/popover.component';

@NgModule({
    declarations: [
        FilterPipe,
        FilterPillComponent,
        PopoverComponent
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
        FilterPillComponent,
        PopoverComponent
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
            faEdit,
            faPrint,
            faList,
            faBars);
    }

}
