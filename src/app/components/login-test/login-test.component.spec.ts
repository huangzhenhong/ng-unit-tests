import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginTestComponent } from './login-test.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { User } from '../../models/user';

describe('LoginTestComponent', () => {
  let component: LoginTestComponent;
  let fixture: ComponentFixture<LoginTestComponent>;
  let submitEl: DebugElement;
  let loginEL: DebugElement;
  let passwordEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    submitEl = fixture.debugElement.query(By.css('button'));
    loginEL = fixture.debugElement.query(By.css('input[type=email]'));
    passwordEl = fixture.debugElement.query(By.css('input[type=password]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Setting enabled to false disables the submit button', () => {
    component.enabled = false;
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBeTruthy();
  });

  it('Entering email and password emits loggedIn event', () => {
    let user: User;
    loginEL.nativeElement.value = 'test@example.com';
    passwordEl.nativeElement.value = '123456';

    component.loggedIn.subscribe((value) => user = value);
    submitEl.triggerEventHandler('click', null);

    expect(user._email).toBe('test@example.com');
    expect(user._password).toBe('123456');
  });

});
