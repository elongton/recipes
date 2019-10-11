import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';


library.add(
    faArrowLeft,
    faPlus,
);

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
    ]
})
export class SharedModule { }
