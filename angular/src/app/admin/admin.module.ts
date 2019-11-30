import { NgModule } from '@angular/core';
import { IngredientComponent } from './ingredient/ingredient.component';
import { UnitComponent } from './unit/unit.component';
import { TagComponent } from './tag/tag.component';
import { AdminRoutingModule } from './admin.routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ApiInterceptor } from '../api.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    declarations: [
        IngredientComponent,
        UnitComponent,
        TagComponent
    ],
    imports: [
        TypeaheadModule.forRoot(),
        AccordionModule.forRoot(),
        ModalModule.forRoot(),
        FormsModule,
        SharedModule,
        AdminRoutingModule,
    ],

    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true
        }
    ],
    entryComponents: [
    ]
})
export class AdminModule { }
