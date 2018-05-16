import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

describe('Component: Login', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: AuthService;
    let el: DebugElement;
    let elAsync: DebugElement;

    beforeEach(() => {
        // refine the test module by declaring the test component
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [AuthService]
        });

        // create componet and test fixture
        fixture = TestBed.createComponent(LoginComponent);

        // get test component from the fixture
        component = fixture.componentInstance;

        // UserService provided to the TestBed
        authService = TestBed.get(AuthService);

        // get the "a" element by CSS selector (e.g., by class name)
        el = fixture.debugElement.query(By.css('a.sync'));

        elAsync = fixture.debugElement.query(By.css('a.async'));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('login button hidden when the user is authenticated', () => {
        expect(el.nativeElement.textContent.trim()).toBe('');
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('Login');
        spyOn(authService, 'isAuthenticated').and.returnValue(true);
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('Logout');
    });

    it('login button hidden when the user is authenticated Async', fakeAsync(() => {
        expect(elAsync.nativeElement.textContent.trim()).toBe('');
        fixture.detectChanges();
        expect(elAsync.nativeElement.textContent.trim()).toBe('Login');
        spyOn(authService, 'isAuthenticatedAsync').and.returnValue(Promise.resolve(true));
        component.ngOnInit();

        tick();
        fixture.detectChanges();
        expect(elAsync.nativeElement.textContent.trim()).toBe('Logout');
    }));

    it('needsLogin returns true when the user is not authenticated', () => {
        spyOn(authService, 'isAuthenticated').and.returnValue(false);
        expect(component.needsLogin()).toBeTruthy();
        expect(authService.isAuthenticated).toHaveBeenCalled();
    });

    it('needsLogin returns false when the user is authenticated', () => {
        spyOn(authService, 'isAuthenticated').and.returnValue(true);
        expect(component.needsLogin()).toBeFalsy();
        expect(authService.isAuthenticated).toHaveBeenCalled();
    });

});
