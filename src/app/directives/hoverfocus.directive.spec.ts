import { HoverfocusDirective } from './hoverfocus.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { inherits } from 'util';

@Component({
  template: `<input type='text' hoverfocus>`
})
class TestHoverFocusComponent {

}

describe('HoverfocusDirective', () => {

  let componet: TestHoverFocusComponent;
  let fixture: ComponentFixture<TestHoverFocusComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoverfocusDirective, TestHoverFocusComponent]
    });

    fixture = TestBed.createComponent(TestHoverFocusComponent);
    componet = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should create an instance', () => {
    const directive = new HoverfocusDirective();
    expect(directive).toBeTruthy();
  });

  it('hovering over input', () => {
    inputEl.triggerEventHandler('mouseover', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.backgroundColor).toBe('blue');
    inputEl.triggerEventHandler('mouseout', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.backgroundColor).toBe('inherit');
  });
});
