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
    faPencilAlt,
    faExchangeAlt,
    faHome,
    faShoppingBag,
    faShoppingBasket,
    faCheck,
    faShoppingCart,
    faCog,
    faShare,
    faBookOpen,
    faBook,
} from '@fortawesome/free-solid-svg-icons';
import { FilterPillComponent } from './components/filter-pill/filter-pill.component';
import { PopoverComponent } from './components/popover/popover.component';
import { EditIngredientModalComponent } from './components/edit-ingredient-modal/edit-ingredient-modal.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
    declarations: [
        LoaderComponent,
        FilterPipe,
        SearchFilterPipe,
        FilterPillComponent,
        PopoverComponent,
        EditIngredientModalComponent,
        RecipeCardComponent,
        TruncatePipe,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        // TypeaheadModule.forRoot(),
        // AccordionModule.forRoot(),
        // ModalModule.forRoot(),
    ],
    exports: [
        LoaderComponent,
        FilterPipe,
        SearchFilterPipe,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        FilterPillComponent,
        PopoverComponent,
        RecipeCardComponent,
        TruncatePipe,

    ],
    entryComponents: [EditIngredientModalComponent, LoaderComponent],
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
            faTrash,
            faPencilAlt,
            faExchangeAlt,
            faHome,
            faShoppingBag,
            faShoppingBasket,
            faShoppingCart,
            faCheck,
            faCog,
            faShare,
            faBookOpen,
            faBook,
        );
    }

}
