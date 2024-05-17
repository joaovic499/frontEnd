import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSenhaFuncionarioComponent } from './modal-senha-funcionario.component';

describe('ModalSenhaFuncionarioComponent', () => {
  let component: ModalSenhaFuncionarioComponent;
  let fixture: ComponentFixture<ModalSenhaFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSenhaFuncionarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSenhaFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
