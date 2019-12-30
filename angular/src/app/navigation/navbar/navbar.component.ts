import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/archive/auth.service';
import * as fromApp from '../../store/app.reducer'
import * as RecipeActions from '../../recipe/store/recipe.actions'
import { Store } from '@ngrx/store';
import { Router, NavigationEnd } from '@angular/router';

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
  constructor(
    public authService: AuthService,
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
      this.shoppingListQuant = user.shoppingList.recipes.length;
      this.user = user;
      // this.userFirstName = user.authUser.given_name;
      // this.userFirstName = user.authUser.given_name;
    });

    // this.authService.userFirstName().subscribe(firstName => {
    //   this.userFirstName = firstName;
    // })
  }

}
