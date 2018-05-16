import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelDrivenFormComponent } from './model-driven-form.component';
import { User } from '../../models/user';

describe('ModelDrivenFormComponent', () => {
  let component: ModelDrivenFormComponent;
  let fixture: ComponentFixture<ModelDrivenFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [ ModelDrivenFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDrivenFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('email field validity', () => {
    const email = component.form.controls['email'];
    expect(email.valid).toBeFalsy();
    let errors = {};
    errors = email.errors;
    expect(errors['required']).toBeTruthy();
    email.setValue('test');
    errors = email.errors;
    expect(errors['pattern']).toBeTruthy();
  });

  it('submitting a form emits a user', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['password'].setValue('12345678');
    expect(component.form.valid).toBeTruthy();

    let user: User;
    component.loggedIn.subscribe((value) => user = value);
    component.login();
    expect(user._email).toBe('test@test.com');
    expect(user._password).toBe('12345678');

  });
});
