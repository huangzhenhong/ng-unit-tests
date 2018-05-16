import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = true;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.isAuthenticatedAsync().then((authenticated) => {
      this.login = !authenticated;
    });
  }

  needsLogin() {
    return !this.auth.isAuthenticated();
  }

}
