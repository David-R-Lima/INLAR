/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DoacaoItensService } from './doacao-itens.service';

describe('Service: DOACAOITENS', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoacaoItensService]
    });
  });

  it('should ...', inject([DoacaoItensService], (service: DoacaoItensService) => {
    expect(service).toBeTruthy();
  }));
});
