import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoacaoFormComponent } from './doacao-form.component';

describe('DoacaoFormComponent', () => {
  let component: DoacaoFormComponent;
  let fixture: ComponentFixture<DoacaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoacaoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
