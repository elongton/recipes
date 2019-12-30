import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer'
import * as UserActions from './user/store/user.actions'
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "recipeApp";
  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit() {

    this.store.dispatch(new AuthActions.GetUser());


    //for storing recently viewed user recipes
    const url = '/recipe/view/'
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd && ev.url.includes(url)) {
        this.store.dispatch(new UserActions.UpdateMeta(ev.url.split(url)[1]))
      }
    });
  }
}

