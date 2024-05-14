import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosRegistroComponent } from './funcionarios-registro.component';

describe('FuncionariosRegistroComponent', () => {
  let component: FuncionariosRegistroComponent;
  let fixture: ComponentFixture<FuncionariosRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FuncionariosRegistroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuncionariosRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
