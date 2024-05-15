import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosHomeComponent } from './funcionarios-home.component';

describe('FuncionariosHomeComponent', () => {
  let component: FuncionariosHomeComponent;
  let fixture: ComponentFixture<FuncionariosHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FuncionariosHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuncionariosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
