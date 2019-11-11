import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchFilterPipe } from './pipes/search-filter.pipe'
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
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FilterPillComponent } from './components/filter-pill/filter-pill.component';
import { PopoverComponent } from './components/popover/popover.component';
import { EditIngredientModalComponent } from './components/edit-ingredient-modal/edit-ingredient-modal.component';

@NgModule({
    declarations: [
        FilterPipe,
        SearchFilterPipe,
        FilterPillComponent,
        PopoverComponent,
        EditIngredientModalComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule,
        FormsModule,
    ],
    exports: [
        FilterPipe,
        SearchFilterPipe,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        FilterPillComponent,
        PopoverComponent
    ],
    entryComponents: [EditIngredientModalComponent],
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
            faBars,
            faTrash);
    }

}
