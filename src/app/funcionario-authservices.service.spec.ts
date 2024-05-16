import { TestBed } from '@angular/core/testing';

import { FuncionarioAuthservicesService } from './funcionario-authservices.service';

describe('FuncionarioAuthservicesService', () => {
  let service: FuncionarioAuthservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionarioAuthservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
