/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DoadorService } from './doador.service';

describe('Service: DOADOR', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoadorService]
    });
  });

  it('should ...', inject([DoadorService], (service: DoadorService) => {
    expect(service).toBeTruthy();
  }));
});
