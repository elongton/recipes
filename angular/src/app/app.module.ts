import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { RecipeDetailComponent } from "./recipe/recipe-detail/recipe-detail.component";
import { RecipeListComponent } from "./recipe/recipe-list/recipe-list.component";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from './shared/shared.module';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { ShoppingListComponent } from './recipe/shopping-list/shopping-list.component';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SidenavComponent } from './core/sidenav/sidenav.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { UnitComponent } from './unit/unit.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeEditComponent,
    ShoppingListComponent,
    SidenavComponent,
    IngredientComponent,
    UnitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    SharedModule,
    BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
