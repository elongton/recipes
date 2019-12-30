import { Component, OnInit } from '@angular/core';
import { AuthService } from '../archive/auth.service';
import * as AuthActions from '../../user/store/user.actions';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  loginGoogle() {
    this.authService.loginGoogle();
  }


}
