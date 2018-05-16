import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-login-test',
  templateUrl: './login-test.component.html',
  styleUrls: ['./login-test.component.css']
})
export class LoginTestComponent {

  @Output() loggedIn = new EventEmitter<User>();
  @Input() enabled = true;

  login(email, password) {
    console.log(`Login ${email} ${password}`);
    if (email && password) {
      console.log(`Emitting`);
      this.loggedIn.emit(new User(email, password));
    }
  }
}
