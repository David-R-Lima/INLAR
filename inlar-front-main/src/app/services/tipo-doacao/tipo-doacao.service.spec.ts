/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TipoDoacaoService } from './tipo-doacao.service';

describe('Service: TIPODOACAO', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoDoacaoService]
    });
  });

  it('should ...', inject([TipoDoacaoService], (service: TipoDoacaoService) => {
    expect(service).toBeTruthy();
  }));
});
