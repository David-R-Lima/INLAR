import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoacaoTableComponent } from './doacao-table.component';

describe('DoacaoTableComponent', () => {
  let component: DoacaoTableComponent;
  let fixture: ComponentFixture<DoacaoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoacaoTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoacaoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
