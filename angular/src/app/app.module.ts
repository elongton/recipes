import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { RecipeDetailComponent } from "./recipe/recipe-detail/recipe-detail.component";
import { RecipeListComponent } from "./recipe/recipe-list/recipe-list.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SharedModule } from './shared/shared.module';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { IngredientComponent } from './admin/ingredient/ingredient.component';
import { UnitComponent } from './admin/unit/unit.component';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ApiInterceptor } from './api.interceptor';
import { HomeComponent } from './home/home.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { SearchComponent } from './home/search/search.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';

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
    LoginComponent,
    HomeComponent,
    RecipeBookComponent,
    MealPlannerComponent,
    NavbarComponent,
    SearchComponent,
    DashboardComponent,
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
