import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormPontosComponent } from './modal-form-pontos.component';

describe('ModalFormPontosComponent', () => {
  let component: ModalFormPontosComponent;
  let fixture: ComponentFixture<ModalFormPontosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormPontosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFormPontosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
