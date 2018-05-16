import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuthService } from './services/auth.service';
import { AppComponent } from './app.component';
import { DefaultPipe } from './pipes/default.pipe';
import { LoginComponent } from './components/login/login.component';
import { LoginTestComponent } from './components/login-test/login-test.component';
import { HoverfocusDirective } from './directives/hoverfocus.directive';
import { ModelDrivenFormComponent } from './components/model-driven-form/model-driven-form.component';


@NgModule({
  declarations: [
    AppComponent,
    DefaultPipe,
    LoginComponent,
    LoginTestComponent,
    HoverfocusDirective,
    ModelDrivenFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
