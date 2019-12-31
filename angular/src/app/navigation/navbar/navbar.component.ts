import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducer'
import * as RecipeActions from '../../recipe/store/recipe.actions'
import { Store } from '@ngrx/store';
import { Router, NavigationEnd } from '@angular/router';
import { Logout } from 'src/app/auth/store/auth.actions';

import * as AuthActions from '../../auth/store/auth.actions'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  sidenav = false;
  currentUrl: string = '';
  user: any = null;
  shoppingListQuant: number = 0;
  authUser: any = null;
  constructor(
    private store: Store<fromApp.AppState>,
    public router: Router,
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });

    this.store.select('user').subscribe(user => {
      this.user = user;
      this.shoppingListQuant = user.shoppingList.recipes.length;
    });

    this.store.select('auth').subscribe(authUser => {
      this.authUser = authUser;
    })
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
