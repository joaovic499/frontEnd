import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosLoginComponent } from './funcionarios-login.component';

describe('FuncionariosLoginComponent', () => {
  let component: FuncionariosLoginComponent;
  let fixture: ComponentFixture<FuncionariosLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FuncionariosLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuncionariosLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
