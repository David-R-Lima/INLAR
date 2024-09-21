import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoacaoHomeComponent } from './doacao-home.component';

describe('DoacaoHomeComponent', () => {
  let component: DoacaoHomeComponent;
  let fixture: ComponentFixture<DoacaoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoacaoHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoacaoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
