import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { CnpjMaskDirective } from './cnpj-mask.directive';

describe('Directive: CnpjMask', () => {
  let directive: CnpjMaskDirective;
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    const mockElementRef = {
      nativeElement: document.createElement('input') // Mock para ElementRef
    };

    TestBed.configureTestingModule({
      declarations: [ CnpjMaskDirective ],
      providers: [
        { provide: ElementRef, useValue: mockElementRef }
      ]
    });

    fixture = TestBed.createComponent<any>(CnpjMaskDirective);
    directive = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
