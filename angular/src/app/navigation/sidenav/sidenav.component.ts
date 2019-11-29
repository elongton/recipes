import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('openClose', [
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(100)
      ]),
    ])
  ]
})
export class SidenavComponent implements OnInit {

  @Output() clickedOutside: EventEmitter<Boolean> = new EventEmitter();
  backdrop: ElementRef;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.clickedOutsideMenu();
        }
      });
  }

  clickedOutsideMenu() {
    this.clickedOutside.emit(true)
  }

  navigate(path: String) {
    if (path === this.router.url) {
      this.clickedOutsideMenu();
    } else {
      this.router.navigate([path])
    }
  }


}
