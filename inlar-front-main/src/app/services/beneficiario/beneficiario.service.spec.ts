/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BeneficiarioService } from './beneficiario.service';

describe('Service: beneficiario', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeneficiarioService]
    });
  });

  it('should ...', inject([BeneficiarioService], (service: BeneficiarioService) => {
    expect(service).toBeTruthy();
  }));
});
