import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducer'
import * as RecipeActions from '../../recipe/store/recipe.actions'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  sidenav = false;
  constructor(public authService: AuthService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new RecipeActions.RetrieveRecipes())
  }

}
