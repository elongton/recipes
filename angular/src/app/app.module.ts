import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from "./app-routing.module";
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';


import { AppComponent } from "./app.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { RecipeDetailComponent } from "./recipe/recipe-detail/recipe-detail.component";
import { RecipeListComponent } from "./recipe/recipe-list/recipe-list.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SharedModule } from './shared/shared.module';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';


import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ApiInterceptor } from './api.interceptor';
import { HomeComponent } from './home/home.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { SearchComponent } from './home/search/search.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { TagDropdownComponent } from './home/search/tag-dropdown/tag-dropdown.component';
import { TagComponent } from './home/search/tag/tag.component';
import { NgxImageCompressService } from 'ngx-image-compress';


import { RecipeEffects } from './recipe/store/recipe.effects';
import { TagEffects } from './admin/tag/store/tag.effects';
import * as fromApp from './store/app.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IngredientEffects } from './admin/ingredient/store/ingredient.effects';
import { UnitEffects } from './admin/unit/store/unit.effects';
import { GeneralEffects } from './store/general/general.effects';
import { UserEffects } from './user/store/user.effects';

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeEditComponent,
    ShoppingListComponent,
    SidenavComponent,
    LoginComponent,
    HomeComponent,
    RecipeBookComponent,
    MealPlannerComponent,
    NavbarComponent,
    SearchComponent,
    DashboardComponent,
    TagDropdownComponent,
    TagComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase, 'recipes'),
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    SharedModule,
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    StoreModule.forRoot(fromApp.appReducer, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),
    EffectsModule.forRoot([
      RecipeEffects,
      TagEffects,
      IngredientEffects,
      UnitEffects,
      GeneralEffects,
      UserEffects,]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production, }),
  ],
  providers: [
    AngularFireAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    NgxImageCompressService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
