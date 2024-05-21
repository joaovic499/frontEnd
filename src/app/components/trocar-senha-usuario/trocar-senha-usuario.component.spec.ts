import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrocarSenhaUsuarioComponent } from './trocar-senha-usuario.component';

describe('TrocarSenhaUsuarioComponent', () => {
  let component: TrocarSenhaUsuarioComponent;
  let fixture: ComponentFixture<TrocarSenhaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrocarSenhaUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrocarSenhaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
