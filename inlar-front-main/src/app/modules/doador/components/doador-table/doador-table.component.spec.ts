/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DoadorTableComponent } from './doador-table.component';

describe('DoadorTableComponent', () => {
  let component: DoadorTableComponent;
  let fixture: ComponentFixture<DoadorTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoadorTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoadorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
