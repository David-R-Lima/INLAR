import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { CpfMaskDirective } from './cpf-mask.directive';

describe('Directive: CpfMask', () => {
  let directive: CpfMaskDirective;
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    const mockElementRef = {
      nativeElement: document.createElement('input') // Mock para ElementRef
    };

    TestBed.configureTestingModule({
      declarations: [ CpfMaskDirective ],
      providers: [
        { provide: ElementRef, useValue: mockElementRef }
      ]
    });

    fixture = TestBed.createComponent<any>(CpfMaskDirective);
    directive = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
