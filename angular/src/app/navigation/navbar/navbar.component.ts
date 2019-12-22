import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
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
  constructor(
    public authService: AuthService,
    private store: Store<fromApp.AppState>,
    public router: Router,
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // console.log(event)
        this.currentUrl = event.url;
      }
    });
  }

}
