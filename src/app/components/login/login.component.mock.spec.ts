import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

class MockedAuthService extends AuthService {
  authenticated = false;

  isAuthenticated() {
    return this.authenticated;
  }
}

describe('Component: Login-Mock', () => {
  let component: LoginComponent;
  let service: MockedAuthService;

  beforeEach(() => {
    service = new MockedAuthService();
    component = new LoginComponent(service);
  });

  afterEach(() => {
    service = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('needsLogin returns true when the user is not authenticated', () => {
    service.authenticated = false;
    expect(component.needsLogin()).toBeTruthy();
  });

  it('needsLogin returns false when the user is authenticated', () => {
    service.authenticated = true;
    expect(component.needsLogin()).toBeFalsy();
  });

});
